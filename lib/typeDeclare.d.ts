export declare type Class = {
    new (...args: any[]): any;
};
export declare type Target = Class | object;
export declare type Key = string | symbol;
export declare type DescOrNum = PropertyDescriptor | number;
export declare type Decorator = (target: Target, key?: Key, descriptorOrIndex?: DescOrNum) => void;
