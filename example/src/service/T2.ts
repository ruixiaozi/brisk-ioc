
import { AutoWrite, Service } from "brisk-ioc";
import { Test } from "../bean/Test";

@Service()
export class T2{

  @AutoWrite()
  test?: Test;

}
