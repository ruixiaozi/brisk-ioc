import { IOption } from "../../interface/IOption";
/**
* InitOption
* @description 初始化选项
* @author ruixiaozi
* @email admin@ruixiaozi.com
* @date 2022年01月16日 15:04:27
* @version 2.0.0
*/
export declare class InitOption implements IOption {
    priority: number;
    /**
     * 构造方法
     * @param priority 优先级，默认值10，值越小优先级越高
     */
    constructor(priority?: number);
}