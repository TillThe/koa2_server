require('babel-core/register');
require('babel-polyfill');

import mysql from 'mysql';
import { db } from '../config/server';

const authors = [
  'Достоевский Федор',
  'Джек Лондон',
  'Фицджеральд Скотт',
  'Конан Дойл',
  'Шарлотта Бронте',
  'Чехов Антон',
  'Дюма Александр',
  'Маркес Габриэль',
  'Альбер Камю',
];

const titles = [
  'Джейн Эйр',
  'Унесенные ветром',
  'Сердца трех',
  'Белый клык',
  'Мартин Иден',
  'Три товарища',
  'Маленький принц',
  'Над пропастью во ржи',
  'Анна Каренина',
  'Граф Монте-Кристо',
  'Алхимик',
  'Идиот',
  'Великий Гэтсби',
  'Война и мир',
];

const descriptions = [
  'Description about something beautiful',
  'Description about ...',
  'Of course about wolf',
  'About love',
  'About faith',
  'About hope',
  'About sins',
  'About all of seven deadly sins',
];

const images = [
  'nature.jpg',
  'no-img.png',
  'wolf.png',
  'second-wolf.png',
  'one-more-wolf.png',
  'why-wolf.png',
  'i-dont-know.png',
  'really-dont-know.png',
];

function getRandomValue(a, b) {
  return a + Math.round(Math.random() * (b - a));
}
function getRandomArrayValue(array) {
  return array[getRandomValue(0, array.length - 1)];
}
function getRandomDate(minYear = 1300, maxYear = 2017) {
  return `${getRandomValue(minYear, maxYear)}-${getRandomValue(1, 12)}-${getRandomValue(1, 28)}`;
}
function getDataSets(rowsAmount = 1) {
  const result = [];

  for (let i = 0; i < rowsAmount; i++) {
    result.push([
      getRandomArrayValue(titles),
      getRandomArrayValue(authors),
      getRandomArrayValue(descriptions),
      getRandomArrayValue(images),
      getRandomDate(),
    ]);
  }

  return result;
}
function formQuery(dataSets) {
  return `INSERT INTO ${db.tables.book} (title, author, description, image, date) VALUES ${dataSets.map((x) => `(${x.map((y) => `'${y}'`).join(', ')})`).join(', ')}`;
}

const fillTable = async (recordAmount) => {
  const connection = mysql.createConnection({
      host: db.options.host,
      user: db.options.username,
      password: db.options.password,
      database: db.options.database,
      port: db.options.port,
    }),
    insertLimit = 10000;

  // connection.connect();

  while (recordAmount > 0) {
    const setCounter = insertLimit < recordAmount ? insertLimit : recordAmount,
      query = formQuery(getDataSets(setCounter));
    recordAmount -= setCounter;
    
    try {
      await new Promise((resolve, reject) => {
        connection.query(query, (error, results, fields) => {
          if (error) {
            console.log('Failed to fill table: ', error);
            reject(error);
            return;
          }
          console.log('\nSuccessfull table filling. Message: ', results.message, '; affectedRows: ', results.affectedRows);
          resolve();
        });
      });
    } catch (e) {
      console.log('Reject!: ', e);
    }
  }

  connection.end();
}

// fillTable(57000);

export default fillTable;