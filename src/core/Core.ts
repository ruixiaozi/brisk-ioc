import { CoreOption, BriskInit } from '@interface';

import * as fs from 'fs';
import * as path from 'path';
import Bluebird from 'bluebird';
import { cloneDeep as _cloneDeep } from 'lodash';
import { BriskLog, Logger } from 'brisk-log';

export enum CoreModeEnum{
  SINGLETION='singleton',
  PROTOTYPE='prototype',
}

/**
 * Core 核心功能
 * @description
 * @author ruixiaozi
 * @email admin@ruixiaozi.com
 */
export class Core {

  static #core?: Core;

  static #defaultSymbol: Symbol = Symbol('default');

  /**
   * 获取Core实例
   * @returns Core
   */
  public static getInstance(): Core {
    if (!Core.#core) {
      Core.#core = new Core();
    }
    return Core.#core;
  }

  // 组件实例容器 <region, <key, value>>
  #container: Map<Symbol, Map<string, any>> = new Map<Symbol, Map<string, any>>();

  #mode: CoreModeEnum = CoreModeEnum.SINGLETION;

  #isDebug: boolean = false;

  // 扫描的组件文件列表
  #componentFileList: string[] = [];

  // 初始化生命 (@Init) 周期方法 列表
  #initList: BriskInit[] = [];

  // 日志实例
  public logger: Logger = BriskLog.getLogger(Symbol('brisk-ioc'));

  /**
   * config 配置 </br>
   * 替代方法：{@link configurate}
   * @deprecated since version 3.0.1
   * @param isDebug 是否开启调试
   * @param mode 模式
   * @returns Core
   */
  public config(isDebug: boolean = false, mode: CoreModeEnum = CoreModeEnum.SINGLETION): Core {
    this.#mode = mode;
    this.#isDebug = isDebug;
    return this;
  }

  /**
   * 配置参数
   * @param option 配置选项
   * @returns Core
   */
  public configurate(option: CoreOption): Core {
    this.#mode = option.model ?? CoreModeEnum.SINGLETION;
    this.#isDebug = option.isDebug ?? false;
    return this;
  }

  /**
   * 是否开启调试
   * @returns boolean
   */
  get isDebug(): boolean {
    return this.#isDebug;
  }

  /**
   * 放置初始化方法到列表
   * @param initFunc 初始化方法
   * @returns Core
   */
  public putInitFunc(initFunc: BriskInit): Core {
    this.#initList.push(initFunc);
    return this;
  }

  /**
   * 放置Bean
   * @param name beanName
   * @param value bean对象
   * @param region 域
   * @returns Core
   */
  public putBean(name: string, value: any, region: Symbol = Core.#defaultSymbol): Core {
    let regionContainer = this.#container.get(region);
    if (!regionContainer) {
      regionContainer = new Map<string, any>();
      this.#container.set(region, regionContainer);
    }
    // 后者可以覆盖
    regionContainer.set(name, value);
    return this;
  }

  /**
   * 获取Bean
   * @param name beanName
   * @param region 域
   * @returns T
   */
  public getBean<T = any>(name: string, region: Symbol = Core.#defaultSymbol): T | undefined {
    const regionContainer = this.#container.get(region);
    const value = regionContainer && regionContainer.get(name);
    // 原型模式则返回一个副本
    if (this.#mode === CoreModeEnum.PROTOTYPE && value) {
      return _cloneDeep(value);
    }
    return value;
  }

  /**
   * 获取域下所有bean
   * @param region 域
   * @returns T
   */
  public getBeans<T = any>(region: Symbol = Core.#defaultSymbol): T[] {
    const regionContainer = this.#container.get(region);
    const beans = regionContainer ? [...regionContainer.values()] : [];
    // 原型模式则返回一个副本
    if (this.#mode === CoreModeEnum.PROTOTYPE && beans.length > 0) {
      return _cloneDeep(beans);
    }
    return beans;
  }

  /**
   * scanPackage 扫描包
   * @param {string} dir 绝对路径前缀
   * @param  {string[]} files 目录/js文件 列表,按顺序依次扫描组件
   * @returns {Core} 类本身
   */
  public scanPackage(dir: string, ...files: string[]): Core {
    for (let file of files) {
      file = path.join(dir, file);
      try {
        if (fs.statSync(file).isDirectory()) {
          const subFiles = fs.readdirSync(file);
          this.scanPackage(file, ...subFiles);
        } else {
          this.#componentFileList.push(file);
        }
      } catch (error) {
        this.logger.error(`scanPackage error:${error}`);
      }
    }

    return this;
  }

  /**
   * 异步初始化
   * @returns Promise<Core>
   */
  public async initAsync(): Promise<Core> {
    this.logger.info('brisk-ioc initializing');
    // 先加载组件文件
    this.#componentFileList.forEach((file) => {
      this.#isDebug && this.logger.debug(`scan component file:${file}`);
      require(file);
    });

    // 先对初始化生命周期的方法进行优先级排序
    const InitFns = this.#initList.sort((fnA, fnB) => fnA.priority - fnB.priority);
    // 对初始化方法进行异步调用
    await Bluebird.each(InitFns, (item) => {
      // 调用执行
      const fnRes = item.fn();
      // Promise.resolve保证不论是Promise的方法还是常规方法都得到执行
      return Bluebird.resolve(fnRes);
    });

    this.logger.info('brisk-ioc initialized');
    return this;
  }


}
