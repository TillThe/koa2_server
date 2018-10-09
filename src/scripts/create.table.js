import mysql from 'mysql';
import { db } from '../config/server';

export default function createTable(success) {
  const connection = mysql.createConnection({
    host: db.options.host,
    user: db.options.username,
    password: db.options.password,
    database: db.options.database,
    port: db.options.port,
  });

  const query = `CREATE TABLE books (id INT(10) AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255) NOT NULL, date DATE, author VARCHAR(255) NOT NULL, description TEXT, image VARCHAR(255))`;
      
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log('Failed to create table: ', error);
      connection.end();
      return;
    }
    console.log('\nSuccessfull table creating.');
    connection.end();
    
    success();
  });
}