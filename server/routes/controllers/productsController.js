/* import moment from 'moment'; */
import pool from '../../models/db';

const getAllProducts = (req, res) => {
  const text = 'SELECT * FROM products';
  pool.query(text, (err, data) => {
    if (err) {
      throw err;
    }
    return res.status(200).json(data.rows);
  });
};

const getOneProduct = (req, res) => {
  const text = 'SELECT * FROM products WHERE id = $1';
  pool.query(text, [req.params.id], (err, data) => {
    if (!data.rowCount) {
      return res.status(404).json('Hi! There\'s no product with that id');
    }
    if (err) {
      throw err;
    }
    return res.status(200).json(data.rows[0]);
  });
};

const addProduct = (req, res) => {
  const { body } = req;
  const text = `INSERT INTO
    products(productname, description, price, quantity)
    VALUES($1, $2, $3, $4, $5)
    returning *`;
  const values = [
    body.productname,
    body.description,
    body.price,
    body.quantity,
    body.min,
  ];
  pool.query(text, values, (err, data) => {
    if (!data.rowCount) {
      return res.status(404).json('Hi! There\'s no product with that id');
    }
    if (err) {
      throw err;
    }
    return res.status(200).json(data.rows[0]);
  });
};

const updateProduct = (req, res) => {
  const { body } = req;
  const text = `UPDATE products
    SET productname=$1, description=$2, price=$3, quantity=$4, min=$5
    WHERE id=$6 returning *`;
  const values = [
    body.productname,
    body.description,
    body.price,
    body.quantity,
    body.min,
    req.params.id,
  ];
  pool.query(text, values, (err, data) => {
    if (err) {
      throw err;
    }
    return res.status(200).json(data.rows[0]);
  });
};

const deleteProduct = (req, res) => {
  const text = 'DELETE FROM products WHERE id=$1 returning *';
  pool.query(text, [req.params.id], (err, data) => {
    if (!data.rowCount) {
      return res.status(404).json('Hi! There\'s no product with that id');
    }
    if (err) {
      throw err;
    }
    return res.status(204).json('Cool. Deleted!');
  });
};

export {
  getAllProducts,
  getOneProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};