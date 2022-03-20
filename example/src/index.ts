import { BriskIoC } from 'brisk-ioc';
import { T2 } from './service/T2';

(async function() {
  await BriskIoC.core
    .config(true)
    .scanPackage(__dirname,"./bean","./controller")
    .initAsync();

  BriskIoC.core.getBean<T2>('t2')?.test?.show();
})();


