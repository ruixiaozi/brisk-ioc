import { BriskIoC } from 'brisk-ioc';
import { T2 } from './service/T2';

(async function() {
  await BriskIoC
    .configurate({
      isDebug: true,
    })
    .core
    .scanPackage(__dirname,"./bean","./service")
    .initAsync();

  BriskIoC.core.getBean<T2>('t2')?.test?.show();
})();


