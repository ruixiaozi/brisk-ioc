"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = exports.AutoWrite = exports.Bean = exports.Init = void 0;
const Core_1 = require("../core/Core");
const InitFunc_1 = require("../entity/InitFunc");
/**
 * 初始化生命周期 装饰器工厂
 * @param {InitOption} option 选项
 * @returns
 */
function Init(option) {
    return function (target, key, descriptorOrIndex) {
        //只有一个参数，类装饰器
        if (target && !key && !descriptorOrIndex) {
        }
        //只有两个参数，属性装饰器
        else if (target && key && !descriptorOrIndex) {
        }
        //三个参数
        else if (target && key && descriptorOrIndex) {
            //第三个参数为数字，参数装饰器
            if (typeof descriptorOrIndex === "number") {
            }
            //访问和访问器装饰器
            else {
                let initFunc = new InitFunc_1.InitFunc(descriptorOrIndex.value, option.priority);
                Core_1.Core.getInstance().initList.push(initFunc);
            }
        }
    };
}
exports.Init = Init;
/**
 * 注册组件 装饰器工厂
 * @param {BeanOption} option 选项
 * @returns
 */
function Bean(option) {
    return function (target, key, descriptorOrIndex) {
        //只有一个参数，类装饰器
        if (target && !key && !descriptorOrIndex) {
            let cTarget = target;
            var name = option.name ||
                cTarget.name.charAt(0).toLowerCase() + cTarget.name.slice(1);
            if (option.prefix) {
                name = option.prefix + name;
            }
            if (!Core_1.Core.getInstance().classes.get(name)) {
                Core_1.Core.getInstance().classes.set(name, cTarget);
            }
        }
        //只有两个参数，属性装饰器
        else if (target && key && !descriptorOrIndex) {
        }
        //三个参数
        else if (target && key && descriptorOrIndex) {
            //第三个参数为数字，参数装饰器
            if (typeof descriptorOrIndex === "number") {
            }
            //访问和访问器装饰器
            else {
            }
        }
    };
}
exports.Bean = Bean;
/**
 * 自动注入 装饰器工厂
 * @param {BeanOption} option 选项
 * @returns
 */
function AutoWrite(option) {
    return function (target, key, descriptorOrIndex) {
        //只有一个参数，类装饰器
        if (target && !key && !descriptorOrIndex) {
        }
        //只有两个参数，属性装饰器
        else if (target && key && !descriptorOrIndex) {
            let realKey = key;
            //注入(构造方法中才会调用初始化，则创建对象的时候才实现注入)
            if (option.name)
                realKey = option.name;
            if (option.prefix) {
                realKey = option.prefix + key.toString();
            }
            let theClass = Core_1.Core.getInstance().classes.get(realKey);
            if (!Core_1.Core.getInstance().container.get(realKey) && theClass) {
                Core_1.Core.getInstance().container.set(realKey, new theClass());
            }
            Reflect.defineProperty(target, key, {
                enumerable: true,
                configurable: false,
                get() {
                    return Core_1.Core.getInstance().container.get(realKey);
                },
            });
        }
        //三个参数
        else if (target && key && descriptorOrIndex) {
            //第三个参数为数字，参数装饰器
            if (typeof descriptorOrIndex === "number") {
            }
            //访问和访问器装饰器
            else {
            }
        }
    };
}
exports.AutoWrite = AutoWrite;
/**
 * 服务 装饰器工厂
 * @param {BeanOption} option 选项
 * @returns
 */
function Service(option) {
    return Bean(option);
}
exports.Service = Service;
