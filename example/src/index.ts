import { T2 } from './controller/T2';


import { BriskIoC } from "../../src/index";


BriskIoC.core.scanPackage(__dirname,"./bean","./controller");


new T2().test.show();
