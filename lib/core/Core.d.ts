import { InitFunc } from "../entity/InitFunc";
import { Class, Key } from "../typeDeclare";
/**
* Core 核心功能
* @description 单例
* @author ruixiaozi
* @email admin@ruixiaozi.com
* @date 2022年01月16日 19:40:13
* @version 2.0.0
*/
export declare class Core {
    private static core?;
    static getInstance(): Core;
    container: Map<Key, object>;
    classes: Map<Key, {
        new (): object;
    }>;
    componentFileList: string[];
    initList: InitFunc[];
    /**
     * scanPackage 扫描包
     * @param {string} dir 绝对路径前缀
     * @param  {string[]} files 目录/js文件 列表,按顺序依次扫描组件
     * @returns {Core} 类本身
     */
    scanPackage(dir: string, ...files: string[]): Core;
    /**
     * 异步初始化
     * @returns Core
     */
    initAsync(): Promise<Core>;
    /**
     * 获取组件
     * @param {String} key 名称
     * @returns {Object} 组件实例（单例）
     */
    getBean(c: Class): any;
    getBean(key: string): any;
}
