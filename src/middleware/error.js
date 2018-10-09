export default async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log(err);
    ctx.status = err.statusCode || err.status || ctx.status || 500;
    ctx.body = {
      message: err.message
    };
  }
}