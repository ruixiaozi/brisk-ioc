import { IBeanOption } from "./../interface/option/IBeanOption";
import { IInitOption } from "./../interface/option/IInitOption";
/**
 * 初始化生命周期 装饰器工厂
 * @param {IInitOption} option 选项
 * @returns
 */
export declare function Init(option?: IInitOption): Function;
/**
 * 注册组件 装饰器工厂
 * @param {IBeanOption} option 选项
 * @returns
 */
export declare function Bean(option?: IBeanOption): Function;
/**
 * 自动注入 装饰器工厂
 * @param {IBeanOption} option 选项
 * @returns
 */
export declare function AutoWrite(option?: IBeanOption): Function;
/**
 * 服务 装饰器工厂
 * @param {IBeanOption} option 选项
 * @returns
 */
export declare function Service(option?: IBeanOption): Function;
