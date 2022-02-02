import { Target, Key, Class, DescOrNum, Decorator } from "./../typeDeclare";

// 类装饰器回调方法类型
export type ClassCallbackFunc = (target: Class) => void;
// 属性装饰器回调方法类型
export type PropertyCallbackFunc = (target: any, key: Key) => void;
// 参数装饰器回调方法类型
export type ParamCallbackFunc = (target: any, key: Key, index: number) => void;
// 方法、访问器装饰器回调方法类型
export type MethodCallbackFunc = (
  target: any,
  key: Key,
  descriptor: PropertyDescriptor
) => void;

/**
 * DecoratorFactory
 * @description 装饰器工厂类
 * @author ruixiaozi
 * @email admin@ruixiaozi.com
 * @date 2022年01月26日 00:47:06
 * @version 2.0.0
 */
export class DecoratorFactory {
  constructor(
    private _classCallback?: ClassCallbackFunc,
    private _propertyCallback?: PropertyCallbackFunc,
    private _paramCallback?: ParamCallbackFunc,
    private _methodCallback?: MethodCallbackFunc
  ) {}

  public setClassCallback(func: ClassCallbackFunc): DecoratorFactory {
    this._classCallback = func;
    return this;
  }

  public setPropertyCallback(func: PropertyCallbackFunc): DecoratorFactory {
    this._propertyCallback = func;
    return this;
  }

  public setParamCallback(func: ParamCallbackFunc): DecoratorFactory {
    this._paramCallback = func;
    return this;
  }

  public setMethodCallback(func: MethodCallbackFunc): DecoratorFactory {
    this._methodCallback = func;
    return this;
  }

  public getDecorator(): Decorator {
    return (target: Target, key?: Key, descriptorOrIndex?: DescOrNum) => {
      //只有一个参数，类装饰器
      if (target && !key && !descriptorOrIndex) {
        const cTarget = target as Class;

        this._classCallback && this._classCallback(cTarget);
      }
      //只有两个参数，属性装饰器
      else if (target && key && !descriptorOrIndex) {
        const oTarget = target as any;
        this._propertyCallback && this._propertyCallback(oTarget, key);
      }
      //三个参数
      else if (target && key && descriptorOrIndex) {
        const oTarget = target as any;
        //第三个参数为数字，参数装饰器
        if (typeof descriptorOrIndex === "number") {
          this._paramCallback &&
            this._paramCallback(oTarget, key, descriptorOrIndex);
        }
        //方法和访问器装饰器
        else {
          this._methodCallback &&
            this._methodCallback(oTarget, key, descriptorOrIndex);
        }
      }
    };
  }
}
