'use strict';

var _create = require('./create.table');

var _create2 = _interopRequireDefault(_create);

var _fill = require('./fill.books');

var _fill2 = _interopRequireDefault(_fill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _create2.default)(function () {
  return (0, _fill2.default)(153000);
});