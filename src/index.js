import { setRoutes } from './controllers/index';
import { setMiddlewares } from './middleware/index';
import setDatabase from './shared/set.database';
import { server } from './config/server';

const Koa = require('koa');

const app = new Koa();

app.use(async (ctx, next) => {
  console.log('Request: ', ctx.request.method, ctx.request.href);
  ctx.body = 'Koa server started';
  await next();
});

setMiddlewares(app);
setDatabase(app);
setRoutes(app);

app.listen(server.port);