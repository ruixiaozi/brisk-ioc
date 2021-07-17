const {Service,AutoWrite} = require('../../../index').CoreDecorator;

@Service()
class T2{

  @AutoWrite()
  test = undefined;

  showt2(){
    this.test.show();
  }

}
