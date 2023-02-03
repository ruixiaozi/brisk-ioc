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
  logger.debug('configure', option);
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
        logger.debug(`scanBean: ${file}`);
      }
    } catch (error) {
      logger.error('scanBean error', error);
    }
  }
}


export async function scanBean() {
  logger.debug('scanBean before');
  for (let beforeHook of hooks.beforeScan) {
    await Promise.resolve(beforeHook.fn());
  }
  scanBeanDFS(_beanPathes);
  logger.debug('scanBean after');
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
  logger.debug('before scans', hooks.beforeScan);
}

export function onAfterScan(cbk: Function, priority = 10) {
  hooks.afterScan.push({
    fn: cbk,
    priority,
  });
  hooks.afterScan.sort(sortHooks);
  logger.debug('after scans', hooks.afterScan);
}

// 配置一个bean
export function setBean(tragetClassName: string, target: any, region?: Symbol): void;
export function setBean(TargetClass: Class, target?: any, region?: Symbol): void;
// customName 自定义类名
export function setBean(TargetClass: Class, target?: any, region?: Symbol, customName?: string): void;
export function setBean(Target: Class | string, target?: any, region: Symbol = defaultRegion, customName?: string) {
  let regionContainer = container.get(region);
  let regionContructorContainer = constructorContainer.get(region);
  if (!regionContainer) {
    regionContainer = new Map<string, any>();
    container.set(region, regionContainer);
    logger.debug('container region is not exist, create success!');
  }
  if (!regionContructorContainer) {
    regionContructorContainer = new Map<string, Class>();
    constructorContainer.set(region, regionContructorContainer);
    logger.debug('constructorContainer region is not exist, create success!');
  }
  const name = typeof Target === 'string' ? Target : (customName || Target.name);
  if (typeof Target !== 'string') {
    regionContructorContainer.set(name, Target);
  }
  if (regionContainer.has(name)) {
    logger.warn(`bean(${name}) is exist, it will be cover!`);
  }
  regionContainer.set(name, target || (typeof Target === 'string' ? undefined : new Target()));
}

export function getBean<T>(tragetClassName: string, region?: Symbol): T | undefined;
export function getBean<T>(TargetClass: Class<T>, region?: Symbol): T | undefined;
export function getBean<T>(Target: Class<T> | string, region: Symbol = defaultRegion): T | undefined {
  const targetName = typeof Target === 'string' ? Target : Target.name;
  // 原型模式返回一个新对象
  if (_model === BRISK_IOC_MODEL_E.PROTOTYPE) {
    let regionContructorContainer = constructorContainer.get(region);
    if (!regionContructorContainer || !regionContructorContainer.has(targetName)) {
      logger.warn('instance cant get, constructorContainer region or targetConstructor is not exist!');
      return undefined;
    }
    const TargetCls = regionContructorContainer.get(targetName)!;
    return new TargetCls();
  }

  let regionContainer = container.get(region);
  if (!regionContainer || !regionContainer.has(targetName)) {
    logger.warn('instance cant get, container region or target is not exist!');
    return undefined;
  }

  return regionContainer.get(targetName);
}
