import { AutoWrite, Bean, OnAfterScan, OnBeforeScan, Service } from "../src/decorator";

@Bean()
export class TestDecorator1 {
  name = 'TestDecorator1';
}

@Service()
export class TestDecorator2 {

  @AutoWrite()
  testDecorator1?: TestDecorator1;

  @OnBeforeScan({
    priority: 2
  })
  static onBefore() {
    console.log('decorator before');
  }

  @OnAfterScan({
    priority: 2
  })
  static onAfter() {
    console.log('decorator after');
  }
}
