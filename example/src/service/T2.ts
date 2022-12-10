
import { AutoWrite, OnBeforeScan, Service } from "brisk-ioc";
import { Test } from "../bean/Test";

@Service()
export class T2{

  @AutoWrite()
  t1?: Test;

  @OnBeforeScan({
    priority: 1
  })
  static before() {
    console.log('before');
  }

}
