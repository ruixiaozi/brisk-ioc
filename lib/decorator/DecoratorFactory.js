"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecoratorFactory = void 0;
/**
* DecoratorFactory
* @description 装饰器工厂类
* @author ruixiaozi
* @email admin@ruixiaozi.com
* @date 2022年01月26日 00:47:06
* @version 2.0.0
*/
class DecoratorFactory {
    constructor(_classCallback, _propertyCallback, _paramCallback, _methodCallback) {
        this._classCallback = _classCallback;
        this._propertyCallback = _propertyCallback;
        this._paramCallback = _paramCallback;
        this._methodCallback = _methodCallback;
    }
    setClassCallback(func) {
        this._classCallback = func;
        return this;
    }
    setPropertyCallback(func) {
        this._propertyCallback = func;
        return this;
    }
    setParamCallback(func) {
        this._paramCallback = func;
        return this;
    }
    setMethodCallback(func) {
        this._methodCallback = func;
        return this;
    }
    getDecorator() {
        return (target, key, descriptorOrIndex) => {
            //只有一个参数，类装饰器
            if (target && !key && !descriptorOrIndex) {
                const cTarget = target;
                this._classCallback && this._classCallback(cTarget);
            }
            //只有两个参数，属性装饰器
            else if (target && key && !descriptorOrIndex) {
                const oTarget = target;
                this._propertyCallback && this._propertyCallback(oTarget, key);
            }
            //三个参数
            else if (target && key && descriptorOrIndex) {
                const oTarget = target;
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
exports.DecoratorFactory = DecoratorFactory;
