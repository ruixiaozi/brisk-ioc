"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitFunc = void 0;
/**
* InitFunc
* @description 初始化方法类型
* @author ruixiaozi
* @email admin@ruixiaozi.com
* @date 2022年01月16日 19:20:11
* @version 2.0.0
*/
class InitFunc {
    /**
     * 构造函数
     * @param fn 方法本身
     * @param priority 优先级
     */
    constructor(fn, priority) {
        this.fn = fn;
        this.priority = priority;
    }
}
exports.InitFunc = InitFunc;
