import { getBean, onAfterScan, onBeforeScan, setBean } from '../core';
import { DecoratorFactory } from 'brisk-ts-extends/decorator';

export interface BriskIoCHookOption {
  // 优先级，默认值10，值越小优先级越高
  priority?: number;
}

export interface BriskIoCBeanOption {
  // 组件域
  region?: Symbol;
}

/**
 * 扫描bean前置方法
 * @param {scanOption} BriskIoCHookOption 选项
 * @returns
 */
export function OnBeforeScan(scanOption?: BriskIoCHookOption): Function {
  return new DecoratorFactory()
    .setMethodCallback((target, key, descriptor) => {
      onBeforeScan(descriptor.value, scanOption?.priority);
    })
    .getDecorator();
}

/**
 * 扫描bean后置方法
 * @param {scanOption} BriskIoCHookOption 选项
 * @returns
 */
export function OnAfterScan(scanOption?: BriskIoCHookOption): Function {
  return new DecoratorFactory()
    .setMethodCallback((target, key, descriptor) => {
      onAfterScan(descriptor.value, scanOption?.priority);
    })
    .getDecorator();
}

/**
 * 注册组件
 * @param {BeanOption} BriskIoCBeanOption 选项
 * @returns
 */
export function Bean(beanOption?: BriskIoCBeanOption): Function {
  return new DecoratorFactory()
    .setClassCallback((Target) => {
      setBean(Target, undefined, beanOption?.region);
    })
    .getDecorator();
}

/**
 * 自动注入
 * @param {BeanOption} BriskIoCBeanOption 选项
 * @returns
 */
export function AutoWrite(beanOption?: BriskIoCBeanOption): Function {
  return new DecoratorFactory()
    .setPropertyCallback((target, key, propertiesDes) => {
      Reflect.defineProperty(target, key, {
        enumerable: true,
        configurable: false,
        get() {
          const typeName = Array.isArray(propertiesDes?.type) ? propertiesDes?.type?.[0] : propertiesDes?.type;
          if (!typeName) {
            return undefined;
          }
          return getBean(typeName, beanOption?.region);
        },
      });
    })
    .getDecorator();
}

/**
 * 服务，bean的别名
 * @param {BeanOption} BriskIoCBeanOption 选项
 * @returns
 */
export function Service(beanOption?: BriskIoCBeanOption): Function {
  return new DecoratorFactory()
    .setClassCallback((Target) => {
      setBean(Target, undefined, beanOption?.region);
    })
    .getDecorator();
}

