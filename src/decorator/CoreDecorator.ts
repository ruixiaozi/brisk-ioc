import { DecoratorFactory } from "./DecoratorFactory";
import { Core } from "../core/Core";
import { InitFunc } from "../entity/InitFunc";
import { BeanOption } from "../entity/options/BeanOption";
import { InitOption } from "../entity/options/InitOption";

/**
 * 初始化生命周期 装饰器工厂
 * @param {InitOption} option 选项
 * @returns
 */
export function Init(option: InitOption): Function {
  return new DecoratorFactory()
    .setMethodCallback((target, key, descriptor) => {
      const initFunc = new InitFunc(descriptor.value, option.priority);
      Core.getInstance().initList.push(initFunc);
    })
    .getDecorator();
}

/**
 * 注册组件 装饰器工厂
 * @param {BeanOption} option 选项
 * @returns
 */
export function Bean(option: BeanOption): Function {
  return new DecoratorFactory()
    .setClassCallback((target) => {
      let name =
        option.name ||
        target.name.charAt(0).toLowerCase() + target.name.slice(1);
      if (option.prefix) {
        name = option.prefix + name;
      }

      if (!Core.getInstance().classes.get(name)) {
        Core.getInstance().classes.set(name, target);
      }
    })
    .getDecorator();
}

/**
 * 自动注入 装饰器工厂
 * @param {BeanOption} option 选项
 * @returns
 */
export function AutoWrite(option: BeanOption): Function {
  return new DecoratorFactory()
    .setPropertyCallback((target, key) => {
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
    })
    .getDecorator();
}

/**
 * 服务 装饰器工厂
 * @param {BeanOption} option 选项
 * @returns
 */
export function Service(option: BeanOption): Function {
  return Bean(option);
}
