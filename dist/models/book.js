'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _query = require('../shared/query.processing');

var _common = require('../shared/common');

var _server = require('../config/server');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var crud = {
  fieldTypes: {
    id: 'number',
    title: 'string',
    author: 'string',
    date: 'date',
    description: 'string',
    image: 'string'
  },

  get: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, id) {
      var query;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              query = [(0, _query.formSelectQueryBody)(_server.db.tables.book), (0, _query.addWhereCondition)('id', (0, _query.typifyValue)(this.fieldTypes.id, id))].join(' ');
              return _context.abrupt('return', ctx.execSql(query));

            case 2:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function get(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return get;
  }(),

  getAll: function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx) {
      var conditions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var usingOffset, queryParts, _getOffsetModify, start, end, query;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              usingOffset = (0, _common.isNumeric)(conditions.limit) && (0, _common.isNumeric)(conditions.offset), queryParts = [(0, _query.formSelectQueryBody)(_server.db.tables.book, usingOffset ? ['id'] : undefined), (0, _query.addGroupCondition)(conditions.groups), (0, _query.addOrderCondition)(conditions.sort, !!conditions.reversedSort), (0, _query.addLimitCondition)(conditions.limit), (0, _query.addOffsetCondition)(conditions.offset)];


              if (usingOffset) {
                _getOffsetModify = (0, _query.getOffsetModify)(_server.db.tables.book, ['id']), start = _getOffsetModify.start, end = _getOffsetModify.end;


                queryParts.unshift(start);
                queryParts.push(end);
              }
              query = queryParts.join(' ');

              // console.log('getAll: ', query);

              return _context2.abrupt('return', ctx.execSql(query));

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function getAll(_x3) {
      return _ref2.apply(this, arguments);
    };
  }(),

  update: function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ctx, id, book) {
      var valueMap, query;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              valueMap = (0, _query.getExistedFields)(this.fieldTypes, book), query = [(0, _query.formUpdateQueryBody)(_server.db.tables.book, valueMap), (0, _query.addWhereCondition)('id', id)].join(' ');

              // console.log('update: ', query);

              _context3.next = 3;
              return ctx.execSql(query);

            case 3:
              return _context3.abrupt('return', _context3.sent.affectedRows);

            case 4:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function update(_x5, _x6, _x7) {
      return _ref3.apply(this, arguments);
    }

    return update;
  }(),

  create: function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(ctx, book) {
      var valueMap, query;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              valueMap = (0, _query.getExistedFields)(this.fieldTypes, book), query = (0, _query.formCreateQueryBody)(_server.db.tables.book, valueMap);

              // console.log('create: ', query);

              return _context4.abrupt('return', ctx.execSql(query));

            case 2:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function create(_x8, _x9) {
      return _ref4.apply(this, arguments);
    }

    return create;
  }()
};

exports.default = crud;