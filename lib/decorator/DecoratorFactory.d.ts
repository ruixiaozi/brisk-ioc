import { Key, Class, Decorator } from "./../typeDeclare";
export declare type ClassCallbackFunc = (target: Class) => void;
export declare type PropertyCallbackFunc = (target: any, key: Key) => void;
export declare type ParamCallbackFunc = (target: any, key: Key, index: number) => void;
export declare type MethodCallbackFunc = (target: any, key: Key, descriptor: PropertyDescriptor) => void;
/**
* DecoratorFactory
* @description 装饰器工厂类
* @author ruixiaozi
* @email admin@ruixiaozi.com
* @date 2022年01月26日 00:47:06
* @version 2.0.0
*/
export declare class DecoratorFactory {
    private _classCallback?;
    private _propertyCallback?;
    private _paramCallback?;
    private _methodCallback?;
    constructor(_classCallback?: ClassCallbackFunc | undefined, _propertyCallback?: PropertyCallbackFunc | undefined, _paramCallback?: ParamCallbackFunc | undefined, _methodCallback?: MethodCallbackFunc | undefined);
    setClassCallback(func: ClassCallbackFunc): DecoratorFactory;
    setPropertyCallback(func: PropertyCallbackFunc): DecoratorFactory;
    setParamCallback(func: ParamCallbackFunc): DecoratorFactory;
    setMethodCallback(func: MethodCallbackFunc): DecoratorFactory;
    getDecorator(): Decorator;
}
