import { Logger } from './../logger/Logger';
import * as fs from 'fs';
import * as path from 'path';
import { Promise } from 'bluebird';
import { InitFunc } from '../entity/InitFunc';
import { cloneDeep as _cloneDeep } from 'lodash';

export enum CoreModeEnum{
  SINGLETION='singleton',
  PROTOTYPE='prototype',
}

/**
 * Core 核心功能
 * @description
 * @author ruixiaozi
 * @email admin@ruixiaozi.com
 * @date 2022年01月16日 19:40:13
 * @version 3.0.0
 */
export class Core {

  static #core?: Core;

  static #defaultSymbol: Symbol = Symbol('default');

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
  #initList: InitFunc[] = [];

  // 日志实例
  public logger: Logger = Logger.getInstance('brisk-ioc');

  public config(isDebug: boolean = false, mode: CoreModeEnum = CoreModeEnum.SINGLETION): Core {
    this.#mode = mode;
    this.#isDebug = isDebug;
    Logger.isDebug = isDebug;
    return this;
  }

  public isDebug(): boolean {
    return this.#isDebug;
  }

  public putInitFunc(initFunc: InitFunc): Core {
    this.#initList.push(initFunc);
    return this;
  }

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
   * 获取组件
   * @param {String} key 名称
   * @returns {Object} 组件实例（单例）
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
   * @returns Core
   */
  public initAsync(): Promise<Core> {
    this.logger.info('brisk-ioc initializing');
    // 先加载组件文件
    this.#componentFileList.forEach((file) => {
      Logger.isDebug && this.logger.debug(`scan component file:${file}`);
      require(file);
    });

    // 先对初始化生命周期的方法进行优先级排序
    const InitFns = this.#initList.sort((fnA, fnB) => fnA.priority - fnB.priority);

    const _that = this;

    // 对初始化方法进行异步调用
    return Promise.each(InitFns, (item) => {
      // 调用执行
      const fnRes = item.fn();
      // 使用Promise.resolve保证不论是Promise的方法还是常规方法都得到执行
      return Promise.resolve(fnRes);
    }).then(() => {
      this.logger.info('brisk-ioc initialized');
      return _that;
    });
  }


}
