# 修改日志 3.x.x [Current]

> 次版本：每季度发布一次，向下兼容的功能性新增  
> 修订版本：每周发布一次(紧急版本随时发布)，向下兼容的问题修正

## 3.0.4 [Current]
###### 发布日期：2022.3.27
###### 兼容性：向下兼容3.x.x
+ 修改依赖版本

## 3.0.3
###### 发布日期：2022.3.27
###### 兼容性：向下兼容3.x.x
+ 增加别名路径，通过别名路径导出子模块
+ 修复DecoratorFactory判断条件

## 3.0.2
###### 发布日期：2022.3.22
###### 兼容性：向下兼容3.x.x
+ README.md [update] 引用的版本标签


## 3.0.1 
###### 发布日期：2022.3.20
###### 兼容性：向下兼容3.x.x
+ README.md [update] 通用性修改
+ Core [update]
  + `configurate(option: ICoreOption): Core` [add] 配置Core
  + `config(isDebug: boolean = false, mode: CoreModeEnum = CoreModeEnum.SINGLETION): Core` [deprecated] 配置Core
+ 修复打包问题

## 3.0.0 
###### 发布日期：2022.3.20
###### 兼容性：不兼容低版本以及相关低版本插件
+ BriskIoC 模块对象 （微调）
  + core Core核心对象
  + use(plugin: IPlugin, option?: IOption): _BriskIoC 使用插件
+ Core核心 （重构）
  + Core.getInstance():Core 获取核心实例
  + logger: Logger = Logger.getInstance('brisk-ioc') brisk-ioc域下的logger对象
  + config(isDebug: boolean = false, mode: CoreModeEnum = CoreModeEnum.SINGLETION): Core 配置core
  + isDebug(): boolean 返回是否开启debug
  + putInitFunc(initFunc: InitFunc): Core 放置初始化方法
  + putBean(name: string, value: any, region: Symbol = Core.#defaultSymbol):Core 将bean放置到容器，增加域概念
  + getBean\<T = any>(name: string, region: Symbol = Core.#defaultSymbol): T | undefined 从容器中获取bean
  + scanPackage(dir: string, ...files: string[]): Core 扫描bean文件/目录列表
  + initAsync(): Promise\<Core> 初始化，完成配置后需要调用
+ Decorator 装饰器 （微调）
  + Init(option?: IInitOption) 初始化方法装饰器（仅支持方法）
  + Bean(option?: IBeanOption) bean类装饰器（仅支持类）
  + AutoWrite(option?: IBeanOption) 依赖注入（仅支持属性）
  + Service(option?: IBeanOption) 同Bean
  + Log(region?: Key) 注入某个域的logger对象 （仅指出属性）
+ 增加 `FIXLOG.md` - 修改日志
+ 引入reflect-metadata
+ 引入brisk-ts-extends，做运行时接口类型判断
