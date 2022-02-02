
export type Class = {new(...args:any[]):any};
export type Target = Class | object;
export type Key = string | symbol;
export type DescOrNum = PropertyDescriptor | number;
export type Decorator = (target: Target, key?: Key, descriptorOrIndex?: DescOrNum) => void;
