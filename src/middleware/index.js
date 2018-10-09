import error from './error';

const middlewares = [
  error,
];

const setMiddlewares = (app) => {
  for (const middleware of middlewares) {
    app.use(middleware);
  }
};

export { setMiddlewares };