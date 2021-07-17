const {Bean} = require('../../../index').CoreDecorator;

@Bean()
class Test{
  show(){
    console.log("test show");
  }
}

module.exports = exports = Test;
