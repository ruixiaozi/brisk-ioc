import BriskIoC from 'brisk-ioc';
import path from 'path';
import { T2 } from './service/T2';

(async function() {
  BriskIoC.configure({
    beanPathes: [path.join(__dirname, './bean'), path.join(__dirname, './service')]
  });
  BriskIoC.onBeforeScan(() => {
    console.log(123);
  })
  await BriskIoC.scanBean();

  BriskIoC.getBean(T2)?.t1?.show();
})();


