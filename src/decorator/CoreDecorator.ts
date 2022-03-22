import { Key } from '@typeDeclare';
import { Logger } from '@logger';
import { IBeanOption, IInitOption } from '@interface';
import { DecoratorFactory } from '@decorator/DecoratorFactory';
import { Core } from '@core';
import { InitFunc, BeanOption, InitOption } from '@entity';
import { camelCase as _camelCase } from 'lodash';

/**
 * 初始化生命周期 装饰器工厂
 * @param {IInitOption} option 选项
 * @returns
 */
export function Init(option?: IInitOption): Function {
  const initOption = option || new InitOption();
  return new DecoratorFactory()
    .setMethodCallback((target, key, descriptor) => {
      const initFunc = new InitFunc(descriptor.value, initOption.priority);
      Core.getInstance().putInitFunc(initFunc);
    })
    .getDecorator();
}

/**
 * 注册组件 装饰器工厂
 * @param {IBeanOption} option 选项
 * @returns
 */
export function Bean(option?: IBeanOption): Function {
  const beanOption = option || new BeanOption();
  return new DecoratorFactory()
    .setClassCallback((Target) => {
      let name = beanOption.name || _camelCase(Target.name);
      Core.getInstance().putBean(name, new Target(), beanOption.region);
    })
    .getDecorator();
}

/**
 * 自动注入 装饰器工厂
 * @param {IBeanOption} option 选项
 * @returns
 */
export function AutoWrite(option?: IBeanOption): Function {
  const beanOption = option || new BeanOption();
  return new DecoratorFactory()
    .setPropertyCallback((target, key) => {
      const realKey = beanOption.name || key.toString();
      Reflect.defineProperty(target, key, {
        enumerable: true,
        configurable: false,
        get() {
          return Core.getInstance().getBean(realKey, beanOption.region);
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

/**
 * 日志 装饰器工厂
 * @returns
 */
export function Log(region?: Key): Function {
  return new DecoratorFactory()
    .setPropertyCallback((target, key) => {
      Reflect.defineProperty(target, key, {
        enumerable: true,
        configurable: false,
        get() {
          return Logger.getInstance(region);
        },
      });
    })
    .getDecorator();
}
