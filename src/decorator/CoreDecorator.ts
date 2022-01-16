import { Core } from "../core/Core";
import { InitFunc } from "../entity/InitFunc";
import { BeanOption } from "../entity/options/BeanOption";
import { InitOption } from "../entity/options/InitOption";

import { Target, Class, DescOrNum, Key } from "../typeDeclare";

/**
 * 初始化生命周期 装饰器工厂
 * @param {InitOption} option 选项
 * @returns
 */
export function Init(option: InitOption): Function {
  return function (
    target: Target,
    key?: Key,
    descriptorOrIndex?: DescOrNum
  ): void {
    //只有一个参数，类装饰器
    if (target && !key && !descriptorOrIndex) {
    }
    //只有两个参数，属性装饰器
    else if (target && key && !descriptorOrIndex) {
    }
    //三个参数
    else if (target && key && descriptorOrIndex) {
      //第三个参数为数字，参数装饰器
      if (typeof descriptorOrIndex === "number") {
      }
      //访问和访问器装饰器
      else {
        let initFunc = new InitFunc(descriptorOrIndex.value, option.priority);
        Core.getInstance().initList.push(initFunc);
      }
    }
  };
}

/**
 * 注册组件 装饰器工厂
 * @param {BeanOption} option 选项
 * @returns
 */
export function Bean(option: BeanOption): Function {
  return function (
    target: Target,
    key?: Key,
    descriptorOrIndex?: DescOrNum
  ): void {
    //只有一个参数，类装饰器
    if (target && !key && !descriptorOrIndex) {
      let cTarget = target as Class;
      var name =
        option.name ||
        cTarget.name.charAt(0).toLowerCase() + cTarget.name.slice(1);
      if (option.prefix) {
        name = option.prefix + name;
      }

      if (!Core.getInstance().classes.get(name)) {
        Core.getInstance().classes.set(name, cTarget);
      }
    }
    //只有两个参数，属性装饰器
    else if (target && key && !descriptorOrIndex) {
    }
    //三个参数
    else if (target && key && descriptorOrIndex) {
      //第三个参数为数字，参数装饰器
      if (typeof descriptorOrIndex === "number") {
      }
      //访问和访问器装饰器
      else {
      }
    }
  };
}

/**
 * 自动注入 装饰器工厂
 * @param {BeanOption} option 选项
 * @returns
 */
export function AutoWrite(option: BeanOption): Function {
  return function (
    target: Target,
    key?: Key,
    descriptorOrIndex?: DescOrNum
  ): void {
    //只有一个参数，类装饰器
    if (target && !key && !descriptorOrIndex) {
    }
    //只有两个参数，属性装饰器
    else if (target && key && !descriptorOrIndex) {
      let realKey = key;
      //注入(构造方法中才会调用初始化，则创建对象的时候才实现注入)
      if (option.name) realKey = option.name;

      if (option.prefix) {
        realKey = option.prefix + key.toString();
      }

      let theClass = Core.getInstance().classes.get(realKey);

      if (!Core.getInstance().container.get(realKey) && theClass) {
        Core.getInstance().container.set(realKey, new theClass());
      }

      Reflect.defineProperty(target, key, {
        enumerable: true,
        configurable: false,
        get() {
          return Core.getInstance().container.get(realKey);
        },
      });
    }
    //三个参数
    else if (target && key && descriptorOrIndex) {
      //第三个参数为数字，参数装饰器
      if (typeof descriptorOrIndex === "number") {
      }
      //访问和访问器装饰器
      else {
      }
    }
  };
}

/**
 * 服务 装饰器工厂
 * @param {BeanOption} option 选项
 * @returns
 */
export function Service(option: BeanOption): Function {
  return Bean(option);
}
