import pool from './db';

const createTables = () => {
  pool.query('CREATE TABLE IF NOT EXISTS products(id serial PRIMARY KEY, productname VARCHAR(100), description TEXT, price INTEGER, quantity INTEGER)');
  pool.query('CREATE TABLE IF NOT EXISTS sales(id serial PRIMARY KEY, productId SERIAL NOT NULL, productname VARCHAR(100), attendant_id UUID NOT NULL, price INTEGER NOT NULL, quantity INTEGER, totalprice INTEGER, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)');
  pool.query('CREATE TABLE IF NOT EXISTS users(id serial PRIMARY KEY, fullname VARCHAR(100) NOT NULL, emailAdress TEXT NOT NULL, password TEXT NOT NULL, type TEXT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)');
};

const dropTables = () => {
  pool.query('DROP TABLE IF EXISTS products, sales, users');
};

export { createTables, dropTables };
require('make-runnable');
