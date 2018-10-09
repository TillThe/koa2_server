'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createTable;

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _server = require('../config/server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createTable(success) {
  var connection = _mysql2.default.createConnection({
    host: _server.db.options.host,
    user: _server.db.options.username,
    password: _server.db.options.password,
    database: _server.db.options.database,
    port: _server.db.options.port
  });

  var query = 'CREATE TABLE books (id INT(10) AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255) NOT NULL, date DATE, author VARCHAR(255) NOT NULL, description TEXT, image VARCHAR(255))';

  connection.query(query, function (error, results, fields) {
    if (error) {
      console.log('Failed to create table: ', error);
      connection.end();
      return;
    }
    console.log('\nSuccessfull table creating.');
    connection.end();

    success();
  });
}