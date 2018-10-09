'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _koaMysqlTransaction = require('koa-mysql-transaction');

var _koaMysqlTransaction2 = _interopRequireDefault(_koaMysqlTransaction);

var _server = require('../config/server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dbOptions = {
  host: _server.db.options.host,
  user: _server.db.options.username,
  password: _server.db.options.password,
  port: _server.db.options.port,
  database: _server.db.options.database,
  connectionLimit: _server.db.options.connectionLimit
};

exports.default = function (app) {
  app.use((0, _koaMysqlTransaction2.default)(_mysql2.default, dbOptions, 'single'));
};