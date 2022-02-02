"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Core = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const bluebird_1 = require("bluebird");
/**
* Core 核心功能
* @description 单例
* @author ruixiaozi
* @email admin@ruixiaozi.com
* @date 2022年01月16日 19:40:13
* @version 2.0.0
*/
class Core {
    constructor() {
        //组件实例容器
        this.container = new Map();
        //组件的类定义列表
        this.classes = new Map();
        //扫描的组件文件列表
        this.componentFileList = [];
        //初始化生命 (@Init) 周期方法 列表
        this.initList = [];
    }
    static getInstance() {
        if (!Core.core)
            Core.core = new Core();
        return Core.core;
    }
    /**
     * scanPackage 扫描包
     * @param {string} dir 绝对路径前缀
     * @param  {string[]} files 目录/js文件 列表,按顺序依次扫描组件
     * @returns {Core} 类本身
     */
    scanPackage(dir, ...files) {
        for (let file of files) {
            file = path.join(dir, file);
            try {
                if (fs.statSync(file).isDirectory()) {
                    let subFiles = fs.readdirSync(file);
                    this.scanPackage(file, ...subFiles);
                }
                else {
                    this.componentFileList.push(file);
                }
            }
            catch (error) {
                console.log("scanPackage error:" + error);
            }
        }
        return this;
    }
    /**
     * 异步初始化
     * @returns Core
     */
    initAsync() {
        //先加载组件文件
        this.componentFileList.forEach((file) => {
            console.log("scan component file:" + file);
            require(file);
        });
        //先对初始化生命周期的方法进行优先级排序
        let InitFns = this.initList.sort((a, b) => {
            return a.priority - b.priority;
        });
        let that = this;
        //对初始化方法进行异步调用
        return bluebird_1.Promise.each(InitFns, (item, index, length) => {
            //调用执行
            //let fnRes = item.fn.call(that);
            let fnRes = item.fn();
            //使用Promise.resolve保证不论是Promise的方法还是常规方法都得到执行
            return bluebird_1.Promise.resolve(fnRes);
        }).then(() => {
            //返回类本身
            return that;
        });
    }
    getBean(param) {
        let key = typeof param == "string"
            ? param
            : param.name.replace(param.name[0], param.name[0].toLowerCase());
        //如果没有实例，但是有类型，则创建一个单例
        if (!this.container.has(key)) {
            //如果收集到有对应的类型构造器
            let constructor = this.classes.get(key);
            if (constructor) {
                this.container.set(key, new constructor());
            }
            //如果构造器不存在,且传入的类型
            else if (typeof param != "string") {
                this.classes.set(key, param);
                this.container.set(key, new param());
            }
        }
        return this.container.get(key);
    }
}
exports.Core = Core;
