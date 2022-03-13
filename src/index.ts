import { IPlugin } from './interface/IPlugin';
import { Core } from './core/Core';
import { IOption } from './interface/IOption';
// 核心
export * from './core/Core';

// 日志
export * from './logger/Logger';

// 导出实体
export * from './entity/option/BeanOption';
export * from './entity/InitFunc';
export * from './entity/option/InitOption';

// 导出接口
export * from './interface/IOption';
export * from './interface/IPlugin';
export * from './interface/option/IBeanOption';
export * from './interface/option/IInitOption';
export * from './interface/option/ILoggerOption';

// 导出类型声明
export * from './typeDeclare';

// 导出装饰器
export * from './decorator/CoreDecorator';
export * from './decorator/DecoratorFactory';

/**
 * Brisk-IoC
 * License MIT
 * Copyright (c) 2021 Ruixiaozi
 * admin@ruixiaozi.com
 * https://github.com/ruixiaozi/brisk-ioc.git
 */
class _BriskIoC {

  core: Core = Core.getInstance();

  /**
   * 使用插件
   * @description 在所有Core下的方法之前使用
   * @param {IPlugin} plugin 插件
   * @param {Object} option 插件选项
   * @returns void
   */
  use(plugin: IPlugin, option?: IOption): _BriskIoC {
    if (!plugin || !plugin.install) {
      // 错误的格式
      this.core.logger.error('plugins use err: error plugin class format');
    } else {
      this.core.logger.info(`brisk-ioc use plugin: [${plugin?.name || 'no name'}]`);
      // 调用安装方法，传入当前类，和参数
      plugin.install(this.core, option);
    }
    return this;
  }

}

export const BriskIoC = new _BriskIoC();
