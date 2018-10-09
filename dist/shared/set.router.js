"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var setRoutes = function setRoutes(routMap, router) {
  for (var rout in routMap) {
    router.use(rout, routMap[rout]);
  }
};

exports.default = setRoutes;