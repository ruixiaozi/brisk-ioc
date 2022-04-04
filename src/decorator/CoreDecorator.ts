import { BeanOption, InitOption } from '@interface';
import { DecoratorFactory } from 'brisk-ts-extends/decorator';
import { Core } from '@core';
import { camelCase as _camelCase } from 'lodash';

/**
 * 初始化生命周期 装饰器工厂
 * @param {InitOption} initOption 选项
 * @returns
 */
export function Init(initOption: InitOption = { priority: 10 }): Function {
  return new DecoratorFactory()
    .setMethodCallback((target, key, descriptor) => {
      Core.getInstance().putInitFunc({
        fn: descriptor.value,
        priority: initOption.priority,
      });
    })
    .getDecorator();
}

/**
 * 注册组件 装饰器工厂
 * @param {BeanOption} beanOption 选项
 * @returns
 */
export function Bean(beanOption?: BeanOption): Function {
  return new DecoratorFactory()
    .setClassCallback((Target) => {
      let name = beanOption?.name || _camelCase(Target.name);
      Core.getInstance().putBean(name, new Target(), beanOption?.region);
    })
    .getDecorator();
}

/**
 * 自动注入 装饰器工厂
 * @param {BeanOption} beanOption 选项
 * @returns
 */
export function AutoWrite(beanOption?: BeanOption): Function {
  return new DecoratorFactory()
    .setPropertyCallback((target, key) => {
      const realKey = beanOption?.name || key.toString();
      Reflect.defineProperty(target, key, {
        enumerable: true,
        configurable: false,
        get() {
          return Core.getInstance().getBean(realKey, beanOption?.region);
        },
      });
    })
    .getDecorator();
}

/**
 * 服务 装饰器工厂
 * @param {BeanOption} beanOption 选项
 * @returns
 */
export function Service(beanOption?: BeanOption): Function {
  return Bean(beanOption);
}

