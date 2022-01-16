# BriskIoC 2

BriskIoC 2 is a fast, light-weight, brisk IoC/DI container to work in ts-node. It refers to the Spring framework and implements dependency injection through decorators and reflection.

BriskIoC 2是一个快速、轻量级、轻快的IoC/DI容器，可以在ts-node中工作。它参考了Spring框架，通过装饰器与反射实现依赖注入。

推荐(后台开发)搭配：

brisk-ioc + [brisk-controller](https://github.com/ruixiaozi/brisk-controller) + [brisk-orm](https://github.com/ruixiaozi/brisk-orm)

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
   tsconfig.json
   package.json
   ```

   [参考Example](./example)

2. Installation

   First install Node.js And ts-node

   And create file :`tsconfig.json`

   
   //tsconfig.json
   {
     "compilerOptions": {
         "emitDecoratorMetadata": true,
         "experimentalDecorators": true,
   
         "target": "es2019"
     }
   }
   ```

   Update the `package.json`

   ```
   ...
   "scripts": {
       "start": "ts-node src/index.ts"
     },
   ...
   ```

   Then:

   ```
   $ npm install brisk-ioc
   ```

3. Importing and Using ( Example )
  [参考Example](./example)
   

# Support

+ bluebird

# Plugins

+ [brisk-controller 基于express的controller](https://github.com/ruixiaozi/brisk-controller)

+ [brisk-orm 支持mongodb的orm](https://github.com/ruixiaozi/brisk-orm)

  

