import { IPlugin } from './interface/IPlugin';
import { Core } from "./core/Core";
export * from './entity/options/BeanOption';
export * from './entity/InitFunc';
export * from './entity/options/InitOption';
export * from './interface/IOption';
export * from './interface/IPlugin';
export * from './typeDeclare';
export * from './decorator/CoreDecorator';
export * from './decorator/DecoratorFactory';
/**
 * Brisk-IoC
 * License MIT
 * Copyright (c) 2021 Ruixiaozi
 * admin@ruixiaozi.com
 * https://github.com/ruixiaozi/brisk-ioc.git
 */
export declare class BriskIoC {
    static core: Core;
    /**
     * 使用插件
     * @description 在所有Core下的方法之前使用
     * @param {IPlugin} plugin 插件
     * @param {Object} option 插件选项
     * @returns void
     */
    static use(plugin: IPlugin, option?: any): void;
}
