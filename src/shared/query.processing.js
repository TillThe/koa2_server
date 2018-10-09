import { isNumeric } from './common';

const typifyValue = (type, value) => {
  try {
    switch (type) {
      case 'string':
        return String(value);
      case 'number':
        return Number(value);
      case 'date':
        const date = new Date(value);
  
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      default:
        return value;
    }
  } catch (e) {
    console.log('Error while typify: ', e);
    return value;
  }
};

const getExistedFields = (fieldMap, data) => {
  const valueMap = {};

  for (const key in data) {
    if (!fieldMap.hasOwnProperty(key)) continue;

    valueMap[key] = typifyValue(fieldMap[key], data[key]);
  }

  return valueMap;
};

const formSelectQueryBody = (tableName, fields) => {
  return `SELECT ${fields instanceof Array ? fields.join(', ') : '*'} FROM ${tableName}`;
};
const formCreateQueryBody = (tableName, valueMap) => {
  return `INSERT INTO ${tableName} (${Object.keys(valueMap).join(', ')}) VALUES (${Object.values(valueMap).map((x) => `'${x}'`).join(', ')})`;
};
const formUpdateQueryBody = (tableName, valueMap) => {
  return `UPDATE ${tableName} SET ${Object.keys(valueMap).map((x) => `${x} = '${valueMap[x]}'`).join(', ')}`;
};
const addWhereCondition = (field, value) => {
  return (field !== undefined) ? `WHERE ${field} = '${value}'` : '';
};
const addGroupCondition = (groups) => {
  return (groups instanceof Array) ? `GROUP BY ${groups.join(', ')}` : '';
};
const addOrderCondition = (field, reversed = false) => {
  return (typeof field === 'string') ? `ORDER BY ${field} ${reversed ? 'DESC' : 'ASC'}` : '';
};
const addLimitCondition = (limit) => {
  return (isNumeric(limit)) ? `LIMIT ${limit}` : '';
};
const addOffsetCondition = (offset) => {
  return (isNumeric(offset)) ? `OFFSET ${offset}` : '';
};
const getOffsetModify = (tableName, field) => {
  return {
    start: `SELECT * FROM ${tableName} INNER JOIN (`,
    end: `) AS lim USING(${field})`,
  }
};

export {
  typifyValue,
  getExistedFields,
  formSelectQueryBody,
  formCreateQueryBody,
  formUpdateQueryBody,
  addWhereCondition,
  addGroupCondition,
  addOrderCondition,
  addLimitCondition,
  addOffsetCondition,
  getOffsetModify,
};