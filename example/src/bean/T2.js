const {Bean,AutoWrite} = require('../../../index').CoreDecorator;

@Bean()
class T2{

  @AutoWrite()
  test = undefined;

  showt2(){
    this.test.show();
  }

}
