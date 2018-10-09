import mysql from 'mysql';
import koaTransaction from 'koa-mysql-transaction';

import { db } from '../config/server';

const dbOptions = {
  host: db.options.host,
  user: db.options.username,
  password: db.options.password,
  port: db.options.port,
  database: db.options.database,
  connectionLimit: db.options.connectionLimit,
};
  
export default (app) => {
  app.use(koaTransaction(mysql, dbOptions, 'single'));
}