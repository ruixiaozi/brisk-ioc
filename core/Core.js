const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');

/**
 * Core 核心功能
 * @description 单例模式的DI容器
 * @author ruixiaozi
 * @email admin@ruixiaozi.com
 * @version 1.0.0
 */
class Core {
  //组件容器
  static container = {};

  //组件的类定义列表
  static classes = {};

  //扫描的组件文件列表
  static componentFileList = [];

  //初始化生命 (@Init) 周期方法 列表
  static initList = [];

  /**
   * scanComponents 扫描组件
   * @param {String} dir 绝对路径前缀
   * @param  {...any} files 目录/js文件 列表,按顺序依次扫描组件
   * @returns {Class} 类本身
   */
  static scanComponents(dir, ...files) {
    for (let file of files) {
      file = path.join(dir, file);
      try {
        if (fs.statSync(file).isDirectory()) {
          let subFiles = fs.readdirSync(file);
          this.scanComponents(file, ...subFiles);
        } else {
          this.componentFileList.push(file);
        }

      } catch (error) {
        console.log("scanComponents error:" + error);
      }

    }

    return this;
  }

  /**
   * 使用插件（开发中）
   * @param {Class} plugin 插件
   * @returns {Class} 类本身
   */
  static use(plugin) {

    return this;
  }

  /**
   * 异步初始化
   * @returns Promise
   */
  static initAsync() {
    let that = this;
    return new Promise((resolve, reject) => {
      try {
        //先加载组件文件
        this.componentFileList.forEach(file => {
          console.log("scan component file:" + file);
          require(file);
        })

        //先对初始化生命周期的方法进行优先级排序
        let InitFns = this.initList
          .sort((a, b) => {
            return a.priority - b.priority;
          });
        //链式执行初始化生命周期的方法
        Promise.each(InitFns, (item, index, length) => {
          return new Promise((res, rej) => {
            if (item.isAsync) {
              item.fn().then(() => {
                res()
              }).catch(() => {
                rej();
              })
            } else {
              item.fn();
              res();
            }

          });
        }).then(() => {
          //返回类本身
          resolve(that);
        }).catch(error => {
          reject(error);
        })

      } catch (error) {
        reject(error)
      }

    }).catch(error => {
      console.log("init error:"+error);
    });

  }


  /**
   * 获取组件
   * @param {String} key 名称
   * @returns {Object} 组件实例（单例）
   */
  static getBean(key){
    if(!this.container[key] && this.classes[key]){
      this.container[key] = new this.classes[key]();
    }
    return this.container[key];
  }



}

module.exports = exports = Core;
