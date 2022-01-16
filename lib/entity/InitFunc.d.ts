/**
* InitFunc
* @description 初始化方法类型
* @author ruixiaozi
* @email admin@ruixiaozi.com
* @date 2022年01月16日 19:20:11
* @version 2.0.0
*/
export declare class InitFunc {
    fn: Function;
    priority: number;
    /**
     * 构造函数
     * @param fn 方法本身
     * @param priority 优先级
     */
    constructor(fn: Function, priority: number);
}
