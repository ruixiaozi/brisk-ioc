require("@babel/polyfill");
const BriskIoC = require('../../index');

class TestPlugin{
  static pluginName = "TestPlugin";
  static priority = 20;

  static show(){
    console.log("TestPlugin");
  }
}

(async function () {
  await BriskIoC
  .use(TestPlugin)
  .scanComponents(__dirname,"./bean")
  .initAsync();

  BriskIoC.getBean("t2").showt2();

  BriskIoC.TestPlugin.show();
  console.log(BriskIoC);

})();

