"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

exports.isNumeric = isNumeric;