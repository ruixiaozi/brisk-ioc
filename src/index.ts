// 引入reflect-metadata
import 'reflect-metadata';
import * as path from 'path';
import { is, configPath as IS_CONFIG_PATH } from 'brisk-ts-extends/is';
// 配置is扩展的接口json文件
IS_CONFIG_PATH(path.join(__dirname, './interface.json'));
import { IPlugin, IOption } from '@interface';
import { Core } from '@core';
// 核心
export * from '@core';

// 日志
export * from '@logger';

// 导出实体
export * from '@entity';

// 导出接口
export * from '@interface';

// 导出类型声明
export * from '@typeDeclare';

// 导出装饰器
export * from '@decorator';

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
  public use(plugin: IPlugin, option?: IOption): _BriskIoC {
    if (is<IPlugin>(plugin, 'IPlugin')) {
      this.core.logger.info(`brisk-ioc use plugin: [${plugin?.name || 'no name'}]`);
      // 调用安装方法，传入当前类，和参数
      plugin.install(this.core, option);
    } else {
      // 错误的格式
      this.core.logger.error('plugins use err: error plugin class format');
    }
    return this;
  }

}

export const BriskIoC = new _BriskIoC();
