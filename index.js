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
const BriskIoC = {
  ...Core,
  ...CoreDecorator,
  Utils
}

module.exports = exports = BriskIoC;
