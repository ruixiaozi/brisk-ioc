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
class BriskIoC extends Core{
  static CoreDecorator = CoreDecorator;
  static Utils = Utils;

  /**
   * 使用插件
   * @description 在所有Core下的方法之前使用
   * @param {Class} plugin 插件 {pluginName?=类名 组件名称，priority?=10 优先级}
   * @returns {Class} 类本身
   */
   static use(plugin) {
    if(!plugin || (!plugin.pluginName && !plugin.name)){
      console.log("plugins use err: null plugin or don't find name");
      return BriskIoC;
    }

     if(plugin.init){
      BriskIoC.initList.push({
        fn: plugin.init,
        //默认优先级为10
        priority: (plugin.priority) ? plugin.priority : 10,
      })
     }

    BriskIoC[plugin.pluginName?plugin.pluginName:plugin.name] = plugin;


    return BriskIoC;
  }
}


module.exports = exports = BriskIoC;
