import pool from './db';


const createTables = () => {
  pool.query('CREATE TABLE IF NOT EXISTS products(id UUID PRIMARY KEY, name VARCHAR(100) NOT NULL, description TEXT, price INTEGER, quantity INTEGER,  min INTEGER, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, modifiedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP)');
  pool.query('CREATE TABLE IF NOT EXISTS sales(id UUID PRIMARY KEY, productId SERIAL NOT NULL, attendantId UUID NOT NULL, price INTEGER NOT NULL, quantity INTEGER,  totalPrice INTEGER, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP)');
  pool.query('CREATE TABLE IF NOT EXISTS users(id UUID PRIMARY KEY, fullName VARCHAR(100) NOT NULL, emailAdress TEXT NOT NULL, password TEXT NOT NULL, type TEXT NOT NULL, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP)');
};

const dropTables = () => {
  pool.query('DROP TABLE IF EXISTS products, sales, users');
};

export { createTables, dropTables };
require('make-runnable');
