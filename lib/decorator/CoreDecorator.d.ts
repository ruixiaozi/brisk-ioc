import { BeanOption } from "../entity/options/BeanOption";
import { InitOption } from "../entity/options/InitOption";
/**
 * 初始化生命周期 装饰器工厂
 * @param {InitOption} option 选项
 * @returns
 */
export declare function Init(option: InitOption): Function;
/**
 * 注册组件 装饰器工厂
 * @param {BeanOption} option 选项
 * @returns
 */
export declare function Bean(option: BeanOption): Function;
/**
 * 自动注入 装饰器工厂
 * @param {BeanOption} option 选项
 * @returns
 */
export declare function AutoWrite(option: BeanOption): Function;
/**
 * 服务 装饰器工厂
 * @param {BeanOption} option 选项
 * @returns
 */
export declare function Service(option: BeanOption): Function;
