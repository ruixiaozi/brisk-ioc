import { IPlugin } from './interface/IPlugin';
import { Core } from "./core/Core";
import { IOption } from './interface/IOption';
export * from './entity/option/BeanOption';
export * from './entity/InitFunc';
export * from './entity/option/InitOption';
export * from './interface/IOption';
export * from './interface/IPlugin';
export * from './interface/option/IBeanOption';
export * from './interface/option/IInitOption';
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
declare class _BriskIoC {
    core: Core;
    /**
     * 使用插件
     * @description 在所有Core下的方法之前使用
     * @param {IPlugin} plugin 插件
     * @param {Object} option 插件选项
     * @returns void
     */
    use(plugin: IPlugin, option?: IOption): _BriskIoC;
}
export declare const BriskIoC: _BriskIoC;
