/**
 * Tools
 */
class Utils {
  /**
   * 类混合,可实现多继承
   * copyright: https://blog.csdn.net/qq_29722281/article/details/96979042
   */
  static mix(...mixins) {
    class Mix {
      constructor(...ags) {
        for (let mixin of mixins) {
          copyProperties(this, new mixin(ags)); // 拷贝实例属性
        }
      }
    }

    for (let mixin of mixins) {
      copyProperties(Mix, mixin); // 拷贝静态属性
      copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
    }

    return Mix;
  }

  static copyProperties(target, source) {
    for (let key of Reflect.ownKeys(source)) {
      if (key !== 'constructor' &&
        key !== 'prototype' &&
        key !== 'name'
      ) {
        let desc = Object.getOwnPropertyDescriptor(source, key);
        Object.defineProperty(target, key, desc);
      }
    }
  }

}

module.exports = exports = Utils;
