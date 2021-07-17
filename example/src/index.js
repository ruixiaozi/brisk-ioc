require("@babel/polyfill");
const BriskIoC = require('../../index');

(async function () {
  await BriskIoC
  .scanComponents(__dirname,"./bean")
  .initAsync();

  BriskIoC.getBean("t2").showt2();

})();

