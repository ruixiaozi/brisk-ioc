import { Core } from './../core/Core';
/**
* IPlugin
* @description 插件接口
* @author ruixiaozi
* @email admin@ruixiaozi.com
* @date 2022年01月17日 00:08:01
* @version 2.0.0
*/
export interface IPlugin {
    install(core: Core, option: any): void;
}
