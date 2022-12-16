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

  // setBean 应该设定指定的实例，当传入实例时
  test('setBean Should set the instance When use target param', () => {
    configure({
      model: BRISK_IOC_MODEL_E.SINGLETION
    });
    class Test4 {
      name = 'test4';
    }
    const instance = new Test4();
    instance.name = '111';
    setBean(Test4, instance);
    const bean1 = getBean(Test4);
    const bean2 = getBean(Test4);
    expect(bean1).toBe(bean2);
    expect(bean1?.name).toBe('111');
  });

  // setBean 应该设定指定类名和指定的实例，当传入类名和实例时
  test('setBean Should set the class name and instance When use class name param and target param', () => {
    configure({
      model: BRISK_IOC_MODEL_E.SINGLETION
    });
    class Test5 {
      name = 'test5';
    }
    const instance = new Test5();
    instance.name = '111';
    setBean('Test5', instance);
    const bean1 = getBean(Test5);
    const bean2 = getBean(Test5);
    expect(bean1).toBe(bean2);
    expect(bean1?.name).toBe('111');
  });

  // setBean 应该设定指定的实例和自定义类名，当传入实例和自定义名称时
  test('setBean Should set the instance and custom class name When use target param and custom name param', () => {
    configure({
      model: BRISK_IOC_MODEL_E.SINGLETION
    });
    class Test6 {
      name = 'test6';
    }
    const instance = new Test6();
    instance.name = '111';
    setBean(Test6, instance, undefined, 'Test61');
    const bean1 = getBean<Test6>('Test61');
    const bean2 = getBean<Test6>('Test61');
    expect(bean1).toBe(bean2);
    expect(bean1?.name).toBe('111');
  });
});
