const Core = require('../core/Core');
/**
 * CoreDecorator 核心装饰器
 * @description
 * @author ruixiaozi
 * @email admin@ruixiaozi.com
 * @version 1.0.0
 */
class CoreDecorator {
  /**
   * 初始化生命周期 装饰器
   * @description 仅支持静态方法
   * @param {Object} option 选项 {isAsync?=false 是否为异步方法, priority?=10 优先级（值小优先级越高）}
   * @returns
   */
  static Init(option) {
    return function (target, key, descriptor) {

      //类装饰器
      if (!descriptor)
        return;

      //方法装饰器
      if (typeof descriptor.value == 'function') {
        Core.initList.push({
          fn: descriptor.value,
          //默认为false
          isAsync: option && option.isAsync,
          //默认优先级为10
          priority: (option && option.priority) ? option.priority : 10,
        })

      }
      //属性装饰器
      else {
        ;
      }


      return descriptor;
    }
  }

  /**
   * 注册组件 装饰器
   * @description 暂时仅支持类
   * @param {Object} option 选项 {prefix? 组件名称前缀, name?=类的小驼峰名称 组件名称}
   * @returns
   */
  static Bean(option) {
    return function (target, key, descriptor) {

      //类装饰器
      if (!descriptor){
        var name = (option && option.name) ? option.name : (target.name.charAt(0).toLowerCase() + target.name.slice(1));
        if (option && option.prefix) {
          name = option.prefix + name;
        }

        if (!Core.classes[name]) {
          Core.classes[name] = target;
        }
        return;
      }

      //方法装饰器
      if (typeof descriptor.value == 'function') {
        ;

      }
      //属性装饰器
      else {
        ;
      }


      return descriptor;

    }
  }


  /**
   * 自动注入 装饰器
   * @description 暂时仅支持属性
   * @param {Object} option 选项 {prefix? 组件名称前缀, name?=属性名称 组件名称}
   * @returns
   */
  static AutoWrite(option) {
    return function (target, key, descriptor) {

      //类装饰器
      if (!descriptor){

        return;
      }

      //方法装饰器
      if (typeof descriptor.value == 'function') {
        ;

      }
      //属性装饰器
      else {
        //注入(构造方法中才会调用初始化，则创建对象的时候才实现注入)
        descriptor.initializer = function () {
          if (option && option.name)
            key = option.name;

          if (option && option.prefix) {
            key = option.prefix + key;
          }

          if (!Core.container[key] && Core.classes[key]) {
            Core.container[key] = new Core.classes[key]();
          }
          return Core.container[key];
        }
      }


      return descriptor;



    }
  }

  /**
   * 服务 装饰器
   * @description 同Bean
   * @param {Object} option 选项 {参考Bean装饰器}
   * @returns
   */
  static Service(option) {
    return Core.Bean(option);
  }
}

module.exports = exports = CoreDecorator;
