import * as fs from "fs";
import * as path from "path";
import { Promise } from "bluebird";
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
export class Core {
  private static core?: Core;

  static getInstance(): Core {
    if (!Core.core) Core.core = new Core();
    return Core.core;
  }

  //组件实例容器
  public container: Map<Key, object> = new Map<Key, object>();

  //组件的类定义列表
  public classes: Map<Key, { new (): object }> = new Map<
    Key,
    { new (): object }
  >();

  //扫描的组件文件列表
  public componentFileList: string[] = [];

  //初始化生命 (@Init) 周期方法 列表
  public initList: InitFunc[] = [];

  /**
   * scanPackage 扫描包
   * @param {string} dir 绝对路径前缀
   * @param  {string[]} files 目录/js文件 列表,按顺序依次扫描组件
   * @returns {Core} 类本身
   */
  public scanPackage(dir: string, ...files: string[]): Core {
    for (let file of files) {
      file = path.join(dir, file);
      try {
        if (fs.statSync(file).isDirectory()) {
          let subFiles = fs.readdirSync(file);
          this.scanPackage(file, ...subFiles);
        } else {
          this.componentFileList.push(file);
        }
      } catch (error) {
        console.log("scanPackage error:" + error);
      }
    }

    return this;
  }

  /**
   * 异步初始化
   * @returns Core
   */
  public initAsync(): Promise<Core> {
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
    return Promise.each(InitFns, (item, index, length) => {
      //调用执行
      let fnRes = item.fn();
      //使用Promise.resolve保证不论是Promise的方法还是常规方法都得到执行
      return Promise.resolve(fnRes);
    }).then(() => {
      //返回类本身
      return that;
    });
  }

  /**
   * 获取组件
   * @param {String} key 名称
   * @returns {Object} 组件实例（单例）
   */
  public getBean(c: Class): any;
  public getBean(key: string): any;
  public getBean(param: string | Class): any {
    let key =
      typeof param == "string"
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
