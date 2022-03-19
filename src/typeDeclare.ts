export type Class<T = any> = new (...args: Array<any>)=> T;
export type Target = Class | object;
export type Key = string | symbol;
export type DescOrNum = PropertyDescriptor | number;
export type Decorator = (
  target: Target,
  key?: Key,
  descriptorOrIndex?: DescOrNum
) => void;
