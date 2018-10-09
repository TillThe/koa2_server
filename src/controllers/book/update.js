import book from '../../models/book';

export default async (ctx, next) => {
  try {
    await book.update(ctx, ctx.params.id, ctx.request.body);
    ctx.status = 204;
  } catch (e) {
    ctx.status = 400;
    throw new Error('Bad request');
  }
}