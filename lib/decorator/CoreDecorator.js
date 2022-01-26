"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = exports.AutoWrite = exports.Bean = exports.Init = void 0;
const DecoratorFactory_1 = require("./DecoratorFactory");
const Core_1 = require("../core/Core");
const InitFunc_1 = require("../entity/InitFunc");
/**
 * 初始化生命周期 装饰器工厂
 * @param {InitOption} option 选项
 * @returns
 */
function Init(option) {
    return new DecoratorFactory_1.DecoratorFactory()
        .setMethodCallback((target, key, descriptor) => {
        const initFunc = new InitFunc_1.InitFunc(descriptor.value, option.priority);
        Core_1.Core.getInstance().initList.push(initFunc);
    })
        .getDecorator();
}
exports.Init = Init;
/**
 * 注册组件 装饰器工厂
 * @param {BeanOption} option 选项
 * @returns
 */
function Bean(option) {
    return new DecoratorFactory_1.DecoratorFactory()
        .setClassCallback((target) => {
        let name = option.name ||
            target.name.charAt(0).toLowerCase() + target.name.slice(1);
        if (option.prefix) {
            name = option.prefix + name;
        }
        if (!Core_1.Core.getInstance().classes.get(name)) {
            Core_1.Core.getInstance().classes.set(name, target);
        }
    })
        .getDecorator();
}
exports.Bean = Bean;
/**
 * 自动注入 装饰器工厂
 * @param {BeanOption} option 选项
 * @returns
 */
function AutoWrite(option) {
    return new DecoratorFactory_1.DecoratorFactory()
        .setPropertyCallback((target, key) => {
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
    })
        .getDecorator();
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
