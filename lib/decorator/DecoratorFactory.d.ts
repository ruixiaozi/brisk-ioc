import { Key, Class } from "./../typeDeclare";
export declare type ClassCallbackFunc = (target: Class) => any;
export declare type PropertyCallbackFunc = (target: object, key: Key) => any;
export declare type ParamCallbackFunc = (target: object, key: Key, index: number) => any;
export declare type MethodCallbackFunc = (target: object, key: Key, descriptor: PropertyDescriptor) => any;
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
    getDecorator(): Function;
}
