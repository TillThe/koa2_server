import book from '../../models/book';
import querystring from 'query-string';

export default async (ctx, next) => {
  const params = querystring.parse(ctx.request.querystring, { arrayFormat: 'bracket' });

  if (params.reversedSort) {
    params.reversedSort = params.reversedSort === 'true';
  }

  try {
    ctx.body = await book.getAll(ctx, params);
  } catch (e) {
    ctx.status = 400;
    throw new Error('Bad request');
  }
};