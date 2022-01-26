"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BriskIoC = void 0;
const Core_1 = require("./core/Core");
__exportStar(require("./entity/options/BeanOption"), exports);
__exportStar(require("./entity/InitFunc"), exports);
__exportStar(require("./entity/options/InitOption"), exports);
__exportStar(require("./interface/IOption"), exports);
__exportStar(require("./interface/IPlugin"), exports);
__exportStar(require("./typeDeclare"), exports);
__exportStar(require("./decorator/CoreDecorator"), exports);
__exportStar(require("./decorator/DecoratorFactory"), exports);
/**
 * Brisk-IoC
 * License MIT
 * Copyright (c) 2021 Ruixiaozi
 * admin@ruixiaozi.com
 * https://github.com/ruixiaozi/brisk-ioc.git
 */
class BriskIoC {
    /**
     * 使用插件
     * @description 在所有Core下的方法之前使用
     * @param {IPlugin} plugin 插件
     * @param {Object} option 插件选项
     * @returns void
     */
    static use(plugin, option) {
        if (!plugin || !plugin.install) {
            //错误的格式
            console.log("plugins use err: error plugin class format");
        }
        else {
            //调用安装方法，传入当前类，和参数
            plugin.install(BriskIoC.core, option);
        }
    }
}
exports.BriskIoC = BriskIoC;
BriskIoC.core = Core_1.Core.getInstance();
