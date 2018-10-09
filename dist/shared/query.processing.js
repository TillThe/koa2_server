'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOffsetModify = exports.addOffsetCondition = exports.addLimitCondition = exports.addOrderCondition = exports.addGroupCondition = exports.addWhereCondition = exports.formUpdateQueryBody = exports.formCreateQueryBody = exports.formSelectQueryBody = exports.getExistedFields = exports.typifyValue = undefined;

var _common = require('./common');

var typifyValue = function typifyValue(type, value) {
  try {
    switch (type) {
      case 'string':
        return String(value);
      case 'number':
        return Number(value);
      case 'date':
        var date = new Date(value);

        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
      default:
        return value;
    }
  } catch (e) {
    console.log('Error while typify: ', e);
    return value;
  }
};

var getExistedFields = function getExistedFields(fieldMap, data) {
  var valueMap = {};

  for (var key in data) {
    if (!fieldMap.hasOwnProperty(key)) continue;

    valueMap[key] = typifyValue(fieldMap[key], data[key]);
  }

  return valueMap;
};

var formSelectQueryBody = function formSelectQueryBody(tableName, fields) {
  return 'SELECT ' + (fields instanceof Array ? fields.join(', ') : '*') + ' FROM ' + tableName;
};
var formCreateQueryBody = function formCreateQueryBody(tableName, valueMap) {
  return 'INSERT INTO ' + tableName + ' (' + Object.keys(valueMap).join(', ') + ') VALUES (' + Object.values(valueMap).map(function (x) {
    return '\'' + x + '\'';
  }).join(', ') + ')';
};
var formUpdateQueryBody = function formUpdateQueryBody(tableName, valueMap) {
  return 'UPDATE ' + tableName + ' SET ' + Object.keys(valueMap).map(function (x) {
    return x + ' = \'' + valueMap[x] + '\'';
  }).join(', ');
};
var addWhereCondition = function addWhereCondition(field, value) {
  return field !== undefined ? 'WHERE ' + field + ' = \'' + value + '\'' : '';
};
var addGroupCondition = function addGroupCondition(groups) {
  return groups instanceof Array ? 'GROUP BY ' + groups.join(', ') : '';
};
var addOrderCondition = function addOrderCondition(field) {
  var reversed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return typeof field === 'string' ? 'ORDER BY ' + field + ' ' + (reversed ? 'DESC' : 'ASC') : '';
};
var addLimitCondition = function addLimitCondition(limit) {
  return (0, _common.isNumeric)(limit) ? 'LIMIT ' + limit : '';
};
var addOffsetCondition = function addOffsetCondition(offset) {
  return (0, _common.isNumeric)(offset) ? 'OFFSET ' + offset : '';
};
var getOffsetModify = function getOffsetModify(tableName, field) {
  return {
    start: 'SELECT * FROM ' + tableName + ' INNER JOIN (',
    end: ') AS lim USING(' + field + ')'
  };
};

exports.typifyValue = typifyValue;
exports.getExistedFields = getExistedFields;
exports.formSelectQueryBody = formSelectQueryBody;
exports.formCreateQueryBody = formCreateQueryBody;
exports.formUpdateQueryBody = formUpdateQueryBody;
exports.addWhereCondition = addWhereCondition;
exports.addGroupCondition = addGroupCondition;
exports.addOrderCondition = addOrderCondition;
exports.addLimitCondition = addLimitCondition;
exports.addOffsetCondition = addOffsetCondition;
exports.getOffsetModify = getOffsetModify;