import path from 'path';
import { configure, getBean, onAfterScan, onBeforeScan, scanBean } from '../src/core';
import { TestDecorator2 } from './decorator.exp';

describe('decorator', () => {

  let consoleLog = jest.spyOn(console, 'log');

  beforeAll(async () => {
    configure({
      beanPathes: [path.join(__dirname, './decorator.exp.ts')]
    });
    onBeforeScan(() => {
      console.log('fun before');
    });
    onAfterScan(() => {
      console.log('fun after');
    })
    await scanBean();
    expect(consoleLog).toHaveBeenNthCalledWith(1, 'decorator before');
    expect(consoleLog).toHaveBeenNthCalledWith(2, 'fun before');
    expect(consoleLog).toHaveBeenNthCalledWith(3, 'decorator after');
    expect(consoleLog).toHaveBeenNthCalledWith(4, 'fun after');
  });

  // getBean 获取到的实例，会根据装饰器的配置依赖注入
  test('getBean Should return has dependency instance When use decorator', () => {
    const testDecorator2 = getBean(TestDecorator2);
    expect(testDecorator2?.testDecorator1?.name).toEqual('TestDecorator1');
  });


});
