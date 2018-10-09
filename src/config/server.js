const server = {
  port: 3000,
};

const db = {
  options: {
    host: 'localhost',
    port: 3306,
    username: 'non-root',
    password: '123',
    database: 'koa',
    connectionLimit: 10,
    dialect: 'mysql',
  },
  tables: {
    book: 'books',
  }
};

export {
  server,
  db,
};