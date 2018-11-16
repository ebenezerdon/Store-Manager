import pool from './db';

const seedProducts = () => {
  const text1 = `INSERT INTO
    products(productname, description, productimage, price, quantity, minallowed)
    VALUES($1, $2, $3, $4, $5, $6)
    returning *`;
  const values1 = [
    'Long Sleeve T shirt',
    'Really cool stuff',
    'http://productimagestuff.com/img1',
    '52000',
    41,
    25,
  ];
  const text2 = `INSERT INTO
    products(productname, description, productimage, price, quantity, minallowed)
    VALUES($1, $2, $3, $4, $5, $6)
    returning *`;
  const values2 = [
    'Black Long Sleeve T shirt',
    'Another Long sleeve',
    'http://productimagestuff.com/img1',
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
  users(fullname, emailaddress, phonenumber, userimage, password, role)
    VALUES($1, $2, $3, $4, $5, $6)`;
  const values1 = [
    'Admin',
    'admin@gmail.com',
    '08024499883',
    'https://images.pexels.com/photos/1213769/pexels-photo-1213769.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'adminpassword',
    'admin',
  ];
  const text2 = `INSERT INTO
  users(fullname, emailaddress, phonenumber, userimage, password, role)
    VALUES($1, $2, $3, $4, $5, $6)`;
  const values2 = [
    'attendant',
    'attendant@gmail.com',
    '09038948732',
    'https://celebritypics.info/images/2018/05/handsome-black-american-actors-unique-30-hot-black-male-actors-under-30-for-2015-of-handsome-black-american-actors.jpg',
    'attendantpassword',
    'attendant',
  ];

  pool.query(text1, values1);
  pool.query(text2, values2);
};

export { seedProducts, seedSales, seedUsers };
require('make-runnable');
