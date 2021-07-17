const CoreDecorator = require('./decorator/CoreDecorator');
const Core = require('./core/Core');
const Utils = require('./utils/Utils');

/**
 * Brisk-IoC
 * License MIT
 * Copyright (c) 2021 Ruixiaozi
 * admin@ruixiaozi.com
 * https://github.com/ruixiaozi/brisk-ioc.git
 */
class BriskIoC extends Core{
  static CoreDecorator = CoreDecorator;
  static Utils = Utils;
}


module.exports = exports = BriskIoC;
