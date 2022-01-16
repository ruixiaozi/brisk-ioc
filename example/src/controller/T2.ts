import { AutoWrite, BeanOption } from "../../../src/index";
import { Test } from "../bean/Test";


export class T2{

 @AutoWrite(new BeanOption())
 test?: Test;

}
