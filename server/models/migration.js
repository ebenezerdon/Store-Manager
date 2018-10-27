import { pool } from './db';

const createTables = () => {
  pool.query('CREATE TABLE IF NOT EXISTS products(productName VARCHAR(100), description TEXT, price INTEGER, quantity INTEGER)');
  pool.query('CREATE TABLE IF NOT EXISTS sales(id INTEGER PRIMARY KEY, productId SERIAL NOT NULL, productName VARCHAR(100), attendantId UUID NOT NULL, price INTEGER NOT NULL, quantity INTEGER, totalPrice INTEGER, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP)');
  pool.query('CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY, fullName VARCHAR(100) NOT NULL, emailAdress TEXT NOT NULL, password TEXT NOT NULL, type TEXT NOT NULL, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP)');
};

const dropTables = () => {
  pool.query('DROP TABLE IF EXISTS products, sales, users');
};

export { createTables, dropTables };
require('make-runnable');
