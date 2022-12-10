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

const defaultRegion = Symbol('briskIoC');

const logger = getLogger(defaultRegion);
logger.configure({
  // 默认是info级别，可通过配置全局来改变此等级
  level: LOGGER_LEVEL_E.info,
});

// 容器
const container: Map<Symbol, Map<string, any>> = new Map<Symbol, Map<string, any>>();
const constructorContainer: Map<Symbol, Map<string, Class>> = new Map<Symbol, Map<string, Class>>();

// bean的路径列表，用来扫描bean
let _beanPathes = [process.cwd()];

// model 默认是单例
let _model = BRISK_IOC_MODEL_E.SINGLETION;

const hooks = {
  beforeScan: [] as BriskIoCHook[],
  afterScan: [] as BriskIoCHook[],
};

export function configure(option: BriskIoCOption) {
  if (option.beanPathes) {
    _beanPathes = option.beanPathes;
  }
  if (option.model) {
    _model = option.model;
  }
}

function scanBeanDFS(files: string[]) {
  for (let file of files) {
    try {
      if (fs.statSync(file).isDirectory()) {
        const subFiles = fs.readdirSync(file);
        scanBeanDFS(subFiles.map((item) => path.join(file, item)));
      } else {
        // 引入文件，加载装饰器
        require(file);
      }
    } catch (error) {
      logger.error(`scanBean error:${error}`);
    }
  }
}


export async function scanBean() {
  for (let beforeHook of hooks.beforeScan) {
    await Promise.resolve(beforeHook.fn());
  }
  scanBeanDFS(_beanPathes);
  for (let afterHook of hooks.afterScan) {
    await Promise.resolve(afterHook.fn());
  }
}

function sortHooks(hookA: BriskIoCHook, hookB: BriskIoCHook) {
  return hookA.priority - hookB.priority;
}

export function onBeforeScan(cbk: Function, priority = 10) {
  hooks.beforeScan.push({
    fn: cbk,
    priority,
  });
  hooks.beforeScan.sort(sortHooks);
}

export function onAfterScan(cbk: Function, priority = 10) {
  hooks.afterScan.push({
    fn: cbk,
    priority,
  });
  hooks.beforeScan.sort(sortHooks);
}

// 配置一个bean
export function setBean(TargetClass: Class, region: Symbol = defaultRegion) {
  let regionContainer = container.get(region);
  let regionContructorContainer = constructorContainer.get(region);
  if (!regionContainer) {
    regionContainer = new Map<string, any>();
    container.set(region, regionContainer);
  }
  if (!regionContructorContainer) {
    regionContructorContainer = new Map<string, Class>();
    constructorContainer.set(region, regionContructorContainer);
  }
  regionContructorContainer.set(TargetClass.name, TargetClass);
  if (regionContainer.has(TargetClass.name)) {
    return;
  }
  regionContainer.set(TargetClass.name, new TargetClass());
}

export function getBean<T>(tragetClassName: string, region?: Symbol): T | undefined;
export function getBean<T>(TargetClass: Class<T>, region?: Symbol): T | undefined;
export function getBean<T>(Target: Class<T> | string, region: Symbol = defaultRegion): T | undefined {
  const targetName = typeof Target === 'string' ? Target : Target.name;
  // 原型模式返回一个新对象
  if (_model === BRISK_IOC_MODEL_E.PROTOTYPE) {
    let regionContructorContainer = constructorContainer.get(region);
    if (!regionContructorContainer || !regionContructorContainer.has(targetName)) {
      return undefined;
    }
    const TargetCls = regionContructorContainer.get(targetName)!;
    return new TargetCls();
  }

  let regionContainer = container.get(region);
  if (!regionContainer || !regionContainer.has(targetName)) {
    return undefined;
  }

  return regionContainer.get(targetName);
}
