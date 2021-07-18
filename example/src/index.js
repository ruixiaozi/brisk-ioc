require("@babel/polyfill");
const BriskIoC = require('../../index');
const BriskController = require('brisk-controller');


(async function () {
  await BriskIoC
  .use(BriskController,{port:2000})
  .scanComponents(__dirname,"./bean","./controller")
  .initAsync();

  BriskController.start();

})();

