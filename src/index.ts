// 引入reflect-metadata
import 'reflect-metadata';
import * as path from 'path';
import { is, configPath as IS_CONFIG_PATH } from 'brisk-ts-extends/is';
// 配置is扩展的接口json文件
IS_CONFIG_PATH(path.join(__dirname, './interface.json'));
import { BriskPlugin, BriskOption, CoreOption, BriskInit, BriskPluginInterFace } from '@interface';
import { Core } from '@core';


/**
 * @deprecated 后续将不导出核心
 */
export * from '@core';

// 导出接口
export * from '@interface';

// 导出装饰器
export * from '@decorator';

/**
 * Brisk-IoC
 * @license MIT
 * @author ruixiaozi
 * admin@ruixiaozi.com
 * https://github.com/ruixiaozi/brisk-ioc
 */
class _BriskIoC {

  /**
   * @deprecated 弃用3.0.7, {@link #iocCore}，后续将不暴露core
   * @since 3.0.0
   */
  core: Core = Core.getInstance();

  /**
   * @since 3.0.7
   */
  #iocCore: Core = Core.getInstance();

  /**
   * 是否开启调试
   * @since 3.0.7
   * @returns boolean
   */
  get isDebug(): boolean {
    return this.#iocCore.isDebug;
  }

  /**
   * 使用插件
   * @description 在所有Core下的方法之前使用
   * @param {BriskPlugin} plugin 插件
   * @param {BriskOption} option 插件选项
   * @since 3.0.5
   * @deprecated 弃用3.0.7, {@link register}
   * @returns _BriskIoC
   */
  public use(plugin: BriskPlugin, option?: BriskOption): _BriskIoC {
    if (is<BriskOption>(plugin, 'BriskOption')) {
      this.#iocCore.logger.info(`brisk-ioc use plugin: [${plugin?.name || 'no name'}]`);
      // 调用安装方法，传入当前类，和参数
      plugin.install(this.#iocCore, option);
    } else {
      // 错误的格式
      this.#iocCore.logger.error('plugins use err: error plugin class format');
    }
    return this;
  }

  /**
   * 注册插件
   * @description 在所有Core下的方法之前使用
   * @param {BriskPluginInterFace} plugin 插件
   * @param {BriskOption} option 插件选项
   * @since 3.0.7
   * @returns _BriskIoC
   */
  public register(plugin: BriskPluginInterFace, option?: BriskOption): _BriskIoC {
    if (is<BriskOption>(plugin, 'BriskOption')) {
      this.#iocCore.logger.info(`brisk-ioc use plugin: [${plugin?.name || 'no name'}]`);
      // 调用安装方法
      plugin.install(option);
    } else {
      // 错误的格式
      this.#iocCore.logger.error('plugins use err: error plugin class format');
    }
    return this;
  }

  /**
   * 配置参数
   * @param option 配置选项
   * @since 3.0.7
   * @returns _BriskIoC
   */
  public configurate(option: CoreOption): _BriskIoC {
    this.#iocCore.configurate(option);
    return this;
  }

  /**
   * 放置初始化方法到列表
   * @param initFunc 初始化方法
   * @since 3.0.7
   * @returns _BriskIoC
   */
  public putInitFunc(initFunc: BriskInit): _BriskIoC {
    this.#iocCore.putInitFunc(initFunc);
    return this;
  }

  /**
   * 放置Bean
   * @param name beanName
   * @param value bean对象
   * @param region 域(可选)
   * @since 3.0.7
   * @returns _BriskIoC
   */
  public putBean(name: string, value: any, region?: Symbol): _BriskIoC {
    this.#iocCore.putBean(name, value, region);
    return this;
  }

  /**
   * 获取Bean
   * @param name beanName
   * @param region 域(可选)
   * @since 3.0.7
   * @returns T | undefined
   */
  public getBean<T = any>(name: string, region?: Symbol): T | undefined {
    return this.#iocCore.getBean<T>(name, region);
  }

  /**
   * 获取域下所有bean
   * @param region 域
   * @since 3.0.7
   * @returns T
   */
  public getBeans<T = any>(region?: Symbol): T[] {
    return this.#iocCore.getBeans<T>(region);
  }

  /**
   * scanPackage 扫描包
   * @param {string} dir 绝对路径前缀
   * @param  {string[]} files 目录/js文件 列表,按顺序依次扫描组件
   * @since 3.0.7
   * @returns _BriskIoC
   */
  public scanPackage(dir: string, ...files: string[]): _BriskIoC {
    this.#iocCore.scanPackage(dir, ...files);
    return this;
  }

  /**
   * 异步初始化
   * @since 3.0.7
   * @returns Promise<_BriskIoC>
   */
  public async initAsync(): Promise<_BriskIoC> {
    await this.#iocCore.initAsync();
    return this;
  }

}

export const BriskIoC = new _BriskIoC();
