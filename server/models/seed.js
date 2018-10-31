import pool from './db';

const seedProducts = () => {
  const text1 = `INSERT INTO
    products(productname, description, price, quantity, min)
    VALUES($1, $2, $3, $4, $5)
    returning *`;
  const values1 = [
    'Long Sleeve T shirt',
    'Really cool stuff',
    '52000',
    41,
    25,
  ];
  const text2 = `INSERT INTO
    products(productname, description, price, quantity, min)
    VALUES($1, $2, $3, $4, $5)
    returning *`;
  const values2 = [
    'Black Long Sleeve T shirt',
    'Another Long sleeve',
    '34512',
    45,
    21,
  ];
  pool.query(text1, values1);
  pool.query(text2, values2);
};

const seedSales = () => {
  const text1 = `INSERT INTO
    sales(productname, productId, price, attendant_id, quantity)
    VALUES($1, $2, $3, $4, $5)
    returning *`;
  const values1 = [
    'Long Sleeve T shirt',
    2,
    '52000',
    41,
    25,
  ];
  const text2 = `INSERT INTO
    sales(productname, productId, price, attendant_id, quantity)
    VALUES($1, $2, $3, $4, $5)`;
  const values2 = [
    'Black Long Sleeve T shirt',
    2,
    '52000',
    42,
    21,
  ];
  pool.query(text1, values1);
  pool.query(text2, values2);
};

const seedUsers = () => {
  const text1 = `INSERT INTO
  users(fullname, emailaddress, password, type)
    VALUES($1, $2, $3, $4)`;
  const values1 = [
    'Admin',
    'admin@gmail.com',
    'adminpassword',
    'admin',
  ];
  const text2 = `INSERT INTO
  users(fullname, emailaddress, password, type)
    VALUES($1, $2, $3, $4)`;
  const values2 = [
    'attendant',
    'attendant@gmail.com',
    'attendantpassword',
    'attendant',
  ];

  pool.query(text1, values1);
  pool.query(text2, values2);
};

export { seedProducts, seedSales, seedUsers };
require('make-runnable');
