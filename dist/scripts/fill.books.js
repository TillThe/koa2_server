'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _server = require('../config/server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require('babel-core/register');
require('babel-polyfill');

var authors = ['Достоевский Федор', 'Джек Лондон', 'Фицджеральд Скотт', 'Конан Дойл', 'Шарлотта Бронте', 'Чехов Антон', 'Дюма Александр', 'Маркес Габриэль', 'Альбер Камю'];

var titles = ['Джейн Эйр', 'Унесенные ветром', 'Сердца трех', 'Белый клык', 'Мартин Иден', 'Три товарища', 'Маленький принц', 'Над пропастью во ржи', 'Анна Каренина', 'Граф Монте-Кристо', 'Алхимик', 'Идиот', 'Великий Гэтсби', 'Война и мир'];

var descriptions = ['Description about something beautiful', 'Description about ...', 'Of course about wolf', 'About love', 'About faith', 'About hope', 'About sins', 'About all of seven deadly sins'];

var images = ['nature.jpg', 'no-img.png', 'wolf.png', 'second-wolf.png', 'one-more-wolf.png', 'why-wolf.png', 'i-dont-know.png', 'really-dont-know.png'];

function getRandomValue(a, b) {
  return a + Math.round(Math.random() * (b - a));
}
function getRandomArrayValue(array) {
  return array[getRandomValue(0, array.length - 1)];
}
function getRandomDate() {
  var minYear = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1300;
  var maxYear = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2017;

  return getRandomValue(minYear, maxYear) + '-' + getRandomValue(1, 12) + '-' + getRandomValue(1, 28);
}
function getDataSets() {
  var rowsAmount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

  var result = [];

  for (var i = 0; i < rowsAmount; i++) {
    result.push([getRandomArrayValue(titles), getRandomArrayValue(authors), getRandomArrayValue(descriptions), getRandomArrayValue(images), getRandomDate()]);
  }

  return result;
}
function formQuery(dataSets) {
  return 'INSERT INTO ' + _server.db.tables.book + ' (title, author, description, image, date) VALUES ' + dataSets.map(function (x) {
    return '(' + x.map(function (y) {
      return '\'' + y + '\'';
    }).join(', ') + ')';
  }).join(', ');
}

var fillTable = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(recordAmount) {
    var connection, insertLimit, _loop;

    return regeneratorRuntime.wrap(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            connection = _mysql2.default.createConnection({
              host: _server.db.options.host,
              user: _server.db.options.username,
              password: _server.db.options.password,
              database: _server.db.options.database,
              port: _server.db.options.port
            }), insertLimit = 10000;

            // connection.connect();

            _loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop() {
              var setCounter, query;
              return regeneratorRuntime.wrap(function _loop$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      setCounter = insertLimit < recordAmount ? insertLimit : recordAmount, query = formQuery(getDataSets(setCounter));

                      recordAmount -= setCounter;

                      _context.prev = 2;
                      _context.next = 5;
                      return new Promise(function (resolve, reject) {
                        connection.query(query, function (error, results, fields) {
                          if (error) {
                            console.log('Failed to fill table: ', error);
                            reject(error);
                            return;
                          }
                          console.log('\nSuccessfull table filling. Message: ', results.message, '; affectedRows: ', results.affectedRows);
                          resolve();
                        });
                      });

                    case 5:
                      _context.next = 10;
                      break;

                    case 7:
                      _context.prev = 7;
                      _context.t0 = _context['catch'](2);

                      console.log('Reject!: ', _context.t0);

                    case 10:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, _loop, undefined, [[2, 7]]);
            });

          case 2:
            if (!(recordAmount > 0)) {
              _context2.next = 6;
              break;
            }

            return _context2.delegateYield(_loop(), 't0', 4);

          case 4:
            _context2.next = 2;
            break;

          case 6:

            connection.end();

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function fillTable(_x4) {
    return _ref.apply(this, arguments);
  };
}();

// fillTable(57000);

exports.default = fillTable;