import { typifyValue, getExistedFields, formSelectQueryBody, formCreateQueryBody, formUpdateQueryBody,
  addWhereCondition, addGroupCondition, addOrderCondition, addLimitCondition, addOffsetCondition, getOffsetModify } from '../shared/query.processing';
import { isNumeric } from '../shared/common';
import { db } from '../config/server';

const crud = {
  fieldTypes: {
    id: 'number',
    title: 'string',
    author: 'string',
    date: 'date',
    description: 'string',
    image: 'string',
  },

  get: async function (ctx, id) {
    const query = [
      formSelectQueryBody(db.tables.book),
      addWhereCondition('id', typifyValue(this.fieldTypes.id, id)),
    ].join(' ');

    return ctx.execSql(query);
  },
  
  getAll: async (ctx, conditions = {}) => {
    const usingOffset = isNumeric(conditions.limit) && isNumeric(conditions.offset),
      queryParts = [
        formSelectQueryBody(db.tables.book, usingOffset ? ['id'] : undefined),
        addGroupCondition(conditions.groups),
        addOrderCondition(conditions.sort, !!conditions.reversedSort),
        addLimitCondition(conditions.limit),
        addOffsetCondition(conditions.offset),
      ];

    if (usingOffset) {
      const { start, end } = getOffsetModify(db.tables.book, ['id']);

      queryParts.unshift(start);
      queryParts.push(end);
    }
    const query = queryParts.join(' ');

    // console.log('getAll: ', query);
    return ctx.execSql(query);
  },

  update: async function (ctx, id, book) {
    const valueMap = getExistedFields(this.fieldTypes, book),
      query = [
        formUpdateQueryBody(db.tables.book, valueMap),
        addWhereCondition('id', id),
      ].join(' ');

    // console.log('update: ', query);
    return (await ctx.execSql(query)).affectedRows;
  },

  create: async function (ctx, book) {
    const valueMap = getExistedFields(this.fieldTypes, book),
      query = formCreateQueryBody(db.tables.book, valueMap);

    // console.log('create: ', query);
    return ctx.execSql(query);
  },
};

export default crud;

