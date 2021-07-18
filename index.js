const CoreDecorator = require('./decorator/CoreDecorator');
const Core = require('./core/Core');
const Utils = require('./utils/Utils');

/**
 * Brisk-IoC
 * License MIT
 * Copyright (c) 2021 Ruixiaozi
 * admin@ruixiaozi.com
 * https://github.com/ruixiaozi/brisk-ioc.git
 */
class BriskIoC extends Core {
  static CoreDecorator = CoreDecorator;
  static Utils = Utils;

  /**
   * 使用插件
   * @description 在所有Core下的方法之前使用
   * @param {Class} plugin 插件
   * @param {Object} option 插件选项
   * @returns {Class} 类本身
   */
  static use(plugin, option) {
    if (!plugin || !plugin.install) {
      console.log("plugins use err: error plugin class format");
    } else {
      plugin.install(BriskIoC, option);
    }
    return BriskIoC;
  }
}


module.exports = exports = BriskIoC;
