import Router from 'koa-router';

import Book from './book/index';

const mainRouter = new Router();
const routes = {
  '/book': Book,
};

export function setRoutes(app) {
  for (const key in routes) {
    mainRouter.use(key, routes[key].routes(), routes[key].allowedMethods());
  }
  app.use(mainRouter.routes());
}
