
const {Controller,RequestMapping} = require('brisk-controller').Decorator;


@Controller({path:'/a'})
class TestController{

  @RequestMapping({path:'/b'})
  test(){
    return {
      type:'json',
      code:200,
      content:{
        mes:'ok'
      }
    }
  }

}
