import * as fs from 'fs';
import * as path from 'path';
import { getLogger, LOGGER_LEVEL_E } from 'brisk-log';
import { Class } from 'brisk-ts-extends';

export enum BRISK_IOC_MODEL_E {
  SINGLETION = 'singleton',
  PROTOTYPE = 'prototype',
}

export interface BriskIoCOption {
  beanPathes?: string[];
  model?: BRISK_IOC_MODEL_E;
}

export interface BriskIoCHook {
  fn: Function;
  priority: number;
}


// 保存运行时容器
const globalVal: {
  // 实例容器
  _briskIoCContainer?: Map<Symbol, Map<string, any>>,
  // 结构容器
  _briskIoCCstContainer?: Map<Symbol, Map<string, Class>>,
  // bean的路径列表，用来扫描bean
  _briskIoCBeanPathes?: string[],
  // model 默认是单例
  _briskIoCModel?: BRISK_IOC_MODEL_E,
  // 钩子
  _briskIoCHooks?: {
    beforeScan: BriskIoCHook[],
    afterScan: BriskIoCHook[],
  },
  _briskDefaultRegion?: symbol,
  [key: string | symbol | number]: any,
} = globalThis;

if (!globalVal._briskIoCContainer) {
  globalVal._briskIoCContainer = new Map<Symbol, Map<string, any>>();
}

if (!globalVal._briskIoCCstContainer) {
  globalVal._briskIoCCstContainer = new Map<Symbol, Map<string, Class>>();
}

if (!globalVal._briskIoCBeanPathes) {
  globalVal._briskIoCBeanPathes = [process.cwd()];
}

if (!globalVal._briskIoCModel) {
  globalVal._briskIoCModel = BRISK_IOC_MODEL_E.SINGLETION;
}

if (!globalVal._briskIoCHooks) {
  globalVal._briskIoCHooks = {
    beforeScan: [] as BriskIoCHook[],
    afterScan: [] as BriskIoCHook[],
  };
}

if (!globalVal._briskDefaultRegion) {
  globalVal._briskDefaultRegion = Symbol('briskIoC');
}

const logger = getLogger(globalVal._briskDefaultRegion);
logger.configure({
  // 默认是info级别，可通过配置全局来改变此等级
  level: LOGGER_LEVEL_E.info,
});

export function configure(option: BriskIoCOption) {
  if (option.beanPathes) {
    globalVal._briskIoCBeanPathes! = option.beanPathes;
  }
  if (option.model) {
    globalVal._briskIoCModel! = option.model;
  }
  logger.debug('configure', option);
}

function scanBeanDFS(files: string[]) {
  for (let file of files) {
    try {
      if (fs.statSync(file).isDirectory()) {
        const subFiles = fs.readdirSync(file);
        scanBeanDFS(subFiles.map((item) => path.join(file, item)));
      } else if ((file.endsWith('.ts') || file.endsWith('.js')) && !file.endsWith('d.ts')) {
        // 引入文件，加载装饰器
        require(file);
        logger.debug(`scanBean: ${file}`);
      }
    } catch (error) {
      logger.error('scanBean error', error);
    }
  }
}


export async function scanBean() {
  logger.debug('scanBean before');
  for (let beforeHook of globalVal._briskIoCHooks!.beforeScan) {
    await Promise.resolve(beforeHook.fn());
  }
  scanBeanDFS(globalVal._briskIoCBeanPathes!);
  logger.debug('scanBean after');
  for (let afterHook of globalVal._briskIoCHooks!.afterScan) {
    await Promise.resolve(afterHook.fn());
  }
}

function sortHooks(hookA: BriskIoCHook, hookB: BriskIoCHook) {
  return hookA.priority - hookB.priority;
}

export function onBeforeScan(cbk: Function, priority = 10) {
  globalVal._briskIoCHooks!.beforeScan.push({
    fn: cbk,
    priority,
  });
  globalVal._briskIoCHooks!.beforeScan.sort(sortHooks);
  logger.debug('before scans', globalVal._briskIoCHooks!.beforeScan);
}

export function onAfterScan(cbk: Function, priority = 10) {
  globalVal._briskIoCHooks!.afterScan.push({
    fn: cbk,
    priority,
  });
  globalVal._briskIoCHooks!.afterScan.sort(sortHooks);
  logger.debug('after scans', globalVal._briskIoCHooks!.afterScan);
}

// 配置一个bean
export function setBean(tragetClassName: string, target: any, region?: Symbol): void;
export function setBean(TargetClass: Class, target?: any, region?: Symbol): void;
// customName 自定义类名
export function setBean(TargetClass: Class, target?: any, region?: Symbol, customName?: string): void;
export function setBean(Target: Class | string, target?: any, region: Symbol = globalVal._briskDefaultRegion!, customName?: string) {
  let regionContainer = globalVal._briskIoCContainer!.get(region);
  let regionContructorContainer = globalVal._briskIoCCstContainer!.get(region);
  if (!regionContainer) {
    regionContainer = new Map<string, any>();
    globalVal._briskIoCContainer!.set(region, regionContainer);
    logger.debug(`globalVal._briskIoCContainer! region(${region.toString()}) is not exist, create success!`);
  }
  if (!regionContructorContainer) {
    regionContructorContainer = new Map<string, Class>();
    globalVal._briskIoCCstContainer!.set(region, regionContructorContainer);
    logger.debug(`globalVal._briskIoCCstContainer! region(${region.toString()}) is not exist, create success!`);
  }
  const name = typeof Target === 'string' ? Target : (customName || Target.name);
  if (typeof Target !== 'string') {
    regionContructorContainer.set(name, Target);
    logger.debug(`set constructor(${name}) to region(${region.toString()})`);
  }
  if (regionContainer.has(name)) {
    logger.warn(`bean(${name}) is exist, it will be cover!`);
  }
  regionContainer.set(name, target || (typeof Target === 'string' ? undefined : new Target()));
  logger.debug(`set bean(${name}) to region(${region.toString()})`);
}

export function getBean<T>(tragetClassName: string, region?: Symbol): T | undefined;
export function getBean<T>(TargetClass: Class<T>, region?: Symbol): T | undefined;
export function getBean<T>(Target: Class<T> | string, region: Symbol = globalVal._briskDefaultRegion!): T | undefined {
  const targetName = typeof Target === 'string' ? Target : Target.name;
  // 原型模式返回一个新对象
  if (globalVal._briskIoCModel! === BRISK_IOC_MODEL_E.PROTOTYPE) {
    let regionContructorContainer = globalVal._briskIoCCstContainer!.get(region);
    if (!regionContructorContainer) {
      logger.warn(`instance cant get, globalVal._briskIoCCstContainer! region(${region.toString()}) is not exist!`);
      return undefined;
    }
    if (!regionContructorContainer.has(targetName)) {
      logger.warn(`instance cant get, targetConstructor(${targetName}) is not exist!`);
      return undefined;
    }
    const TargetCls = regionContructorContainer.get(targetName)!;
    return new TargetCls();
  }

  let regionContainer = globalVal._briskIoCContainer!.get(region);
  if (!regionContainer) {
    logger.warn(`instance cant get, globalVal._briskIoCContainer! region(${region.toString()}) is not exist!`);
    return undefined;
  }
  if (!regionContainer.has(targetName)) {
    logger.warn(`instance cant get, target(${targetName}) is not exist!`);
    return undefined;
  }

  return regionContainer.get(targetName);
}
