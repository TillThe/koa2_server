import book from '../../models/book';

export default async (ctx, next) => {
  try {
    const result = (await book.get(ctx, ctx.params.id))[0];
  
    if (result) {
      ctx.body = result;
    } else {
      ctx.status = 204;
    }
  } catch (e) {
    ctx.status = 400;
  }
};