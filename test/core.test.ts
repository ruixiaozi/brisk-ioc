import { BRISK_IOC_MODEL_E, configure, getBean, setBean } from '../src/core';

describe('core', () => {

  // getBean 获取一个不存在的bean，会返回undefined
  test('getBean Should return undefined When the bean is not exist', () => {
    class Test1 {
      name = 'test1';
    }
    class Test11 {
      name = 'test11';
    }
    const bean1 = getBean(Test1);
    const bean11 = getBean(Test11);
    expect(bean1).toBe(undefined);
    expect(bean11).toBe(undefined);
  });

  // getBean 应该返回一个单例，当模式为默认
  test('getBean Should return a singleton bean When the model is default', () => {
    class Test2 {
      name = 'test2';
    }
    setBean(Test2);
    const bean1 = getBean(Test2);
    const bean2 = getBean(Test2);
    expect(bean1).toBe(bean2);
  });

  // getBean 应该返回一个新的实例，当模式为原型
  test('getBean Should return a new bean When the model is prototype', () => {
    configure({
      model: BRISK_IOC_MODEL_E.PROTOTYPE
    });
    class Test3 {
      name = 'test3';
    }
    setBean(Test3);
    const bean1 = getBean(Test3);
    const bean2 = getBean(Test3);
    expect(bean1).not.toBe(bean2);
  });

});
