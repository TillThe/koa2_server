'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var server = {
  port: 3000
};

var db = {
  options: {
    host: 'localhost',
    port: 3306,
    username: 'non-root',
    password: '123',
    database: 'koa',
    connectionLimit: 10,
    dialect: 'mysql'
  },
  tables: {
    book: 'books'
  }
};

exports.server = server;
exports.db = db;