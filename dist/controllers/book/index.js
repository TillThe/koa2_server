'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koaConvert = require('koa-convert');

var _koaConvert2 = _interopRequireDefault(_koaConvert);

var _koaBody = require('koa-body');

var _koaBody2 = _interopRequireDefault(_koaBody);

var _get = require('./get');

var _get2 = _interopRequireDefault(_get);

var _get3 = require('./get.all');

var _get4 = _interopRequireDefault(_get3);

var _add = require('./add');

var _add2 = _interopRequireDefault(_add);

var _update = require('./update');

var _update2 = _interopRequireDefault(_update);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _koaRouter2.default(),
    koaBody = (0, _koaConvert2.default)((0, _koaBody2.default)());

router.get('/', _get4.default).get('/:id', _get2.default).post('/', koaBody, _add2.default).put('/:id', koaBody, _update2.default);

exports.default = router;