'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setRoutes = setRoutes;

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _index = require('./book/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mainRouter = new _koaRouter2.default();
var routes = {
  '/book': _index2.default
};

function setRoutes(app) {
  for (var key in routes) {
    mainRouter.use(key, routes[key].routes(), routes[key].allowedMethods());
  }
  app.use(mainRouter.routes());
}