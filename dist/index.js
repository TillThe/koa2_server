'use strict';

var _index = require('./controllers/index');

var _index2 = require('./middleware/index');

var _set = require('./shared/set.database');

var _set2 = _interopRequireDefault(_set);

var _server = require('./config/server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Koa = require('koa');

var app = new Koa();

app.use(function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('Request: ', ctx.request.method, ctx.request.href);
            ctx.body = 'Koa server started';
            _context.next = 4;
            return next();

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

(0, _index2.setMiddlewares)(app);
(0, _set2.default)(app);
(0, _index.setRoutes)(app);

app.listen(_server.server.port);