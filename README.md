# BriskIoC

BriskIoC is a fast, light-weight, brisk IoC/DI container to work in nodejs. It references the decorator of Spring framework and changes some usage in javascript.

BriskIoC是一个快速、轻量级、轻快的IoC/DI容器，可以在nodejs中工作。它参考了Spring框架的装饰器，并改变了javascript中的一些用法。

[![npm version](https://badge.fury.io/js/brisk-ioc.svg)](https://badge.fury.io/js/brisk-ioc)

[![NPM](https://nodei.co/npm/brisk-ioc.png)](https://nodei.co/npm/brisk-ioc/)

# License

[MIT License](./LICENSE)

Copyright (c) 2021 Ruixiaozi

# Documentation

1. Directory Structure

   ```
   src
    --- index.js
   .babelrc
   jsconfig.json
   package.json
   ```

   [参考Example](./example)

2. Installation

   First install Node.js,@babel, 

   ```
   $ npm i @babel/cli -D
   $ npm i @babel/core -D
   $ npm i @babel/plugin-proposal-class-properties -D
   $ npm i @babel/plugin-transform-async-to-generator -D
   $ npm i @babel/preset-env -D
   $ npm i @babel/polyfill -S
   ```

   And create file :` .babelrc` and  `jsconfig.json`

   ```
   //.babelrc
   {
     "presets": ["@babel/preset-env"],
     "assumptions": {
       "setPublicClassFields": true
     },
     "plugins": [
       ["@babel/plugin-proposal-decorators", { "legacy": true }],
       ["@babel/plugin-proposal-class-properties"],
       [
         "@babel/plugin-transform-async-to-generator"
       ]
     ]
   }
   
   //jsconfig.json
   {
     "compilerOptions": {
         "emitDecoratorMetadata": true,
         "experimentalDecorators": true,
   
         "target": "es2017"
     }
   }
   ```

   Update the `package.json`

   ```
   ...
   "scripts": {
       "start": "babel src --out-dir dist --copy-files  && node dist/index.js"
     },
   ...
   ```

   Then:

   ```
   $ npm install brisk-ioc
   ```

3. Importing and Using ( Example )

   ```
   // 'src/bean/Test.js'
   const {Bean} = require('brisk-ioc').CoreDecorator;
   
   @Bean()
   class Test{
     show(){
       console.log("test show");
     }
   }
   
   module.exports = exports = Test;
   
   ```

   ```
   // 'src/bean/T2.js'
   const {Bean,AutoWrite} = require('brisk-ioc').CoreDecorator;
   
   @Bean()
   class T2{
   
     @AutoWrite()
     test = undefined;
   
     showt2(){
       this.test.show();
     }
   
   }
   
   ```

   ```
   // 'src/index.js'
   require("@babel/polyfill");
   const BriskIoC = require('brisk-ioc');
   (async function () {
     await BriskIoC
     //扫描的组件 目录/文件 列表
     .scanComponents(__dirname,"./bean")
     //初始化容器
     .initAsync();
   
     //获取
     BriskIoC.getBean("t2").showt2();
   
   })();
   ```

# Support

+ bluebird

# Plugins

none

