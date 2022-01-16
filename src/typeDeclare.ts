
export type Class = {new(...args:any[]):any};
export type Target = Class | object;
export type Key = string | symbol;
export type DescOrNum = PropertyDescriptor | number;
