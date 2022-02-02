import { IBeanOption } from "./../interface/option/IBeanOption";
import { IInitOption } from "./../interface/option/IInitOption";
import { DecoratorFactory } from "./DecoratorFactory";
import { Core } from "../core/Core";
import { InitFunc } from "../entity/InitFunc";
import { BeanOption } from "../entity/option/BeanOption";
import { InitOption } from "../entity/option/InitOption";

/**
 * 初始化生命周期 装饰器工厂
 * @param {IInitOption} option 选项
 * @returns
 */
export function Init(option?: IInitOption): Function {
  if (!option) option = new InitOption();
  return new DecoratorFactory()
    .setMethodCallback((target, key, descriptor) => {
      const initFunc = new InitFunc(descriptor.value, option!.priority);
      Core.getInstance().initList.push(initFunc);
    })
    .getDecorator();
}

/**
 * 注册组件 装饰器工厂
 * @param {IBeanOption} option 选项
 * @returns
 */
export function Bean(option?: IBeanOption): Function {
  if (!option) option = new BeanOption();
  return new DecoratorFactory()
    .setClassCallback((target) => {
      let name =
        option!.name ||
        target.name.charAt(0).toLowerCase() + target.name.slice(1);
      if (option!.prefix) {
        name = option!.prefix + name;
      }

      if (!Core.getInstance().classes.get(name)) {
        Core.getInstance().classes.set(name, target);
      }
    })
    .getDecorator();
}

/**
 * 自动注入 装饰器工厂
 * @param {IBeanOption} option 选项
 * @returns
 */
export function AutoWrite(option?: IBeanOption): Function {
  if (!option) option = new BeanOption();
  return new DecoratorFactory()
    .setPropertyCallback((target, key) => {
      let realKey = key;
      //注入(构造方法中才会调用初始化，则创建对象的时候才实现注入)
      if (option!.name) realKey = option!.name;

      if (option!.prefix) {
        realKey = option!.prefix + key.toString();
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
 * @param {IBeanOption} option 选项
 * @returns
 */
export function Service(option?: IBeanOption): Function {
  return Bean(option);
}
