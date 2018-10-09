'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _book = require('../../models/book');

var _book2 = _interopRequireDefault(_book);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
    var params;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            params = _queryString2.default.parse(ctx.request.querystring, { arrayFormat: 'bracket' });


            if (params.reversedSort) {
              params.reversedSort = params.reversedSort === 'true';
            }

            _context.prev = 2;
            _context.next = 5;
            return _book2.default.getAll(ctx, params);

          case 5:
            ctx.body = _context.sent;
            _context.next = 12;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context['catch'](2);

            ctx.status = 400;
            throw new Error('Bad request');

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[2, 8]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();