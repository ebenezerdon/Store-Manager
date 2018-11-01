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
      return res.status(404).json({
        message: 'Hi! There\'s no product with that id',
        success: false,
      });
    }
    if (err) {
      throw err;
    }
    return res.status(200).json(data.rows[0]);
  });
};

const addProduct = (req, res) => {
  const { body } = req;
  const text = 'SELECT * FROM products WHERE productname = $1';
  pool.query(text, [body.productname], (err, data) => {
    if (data.rowCount) {
      return res.status(400).json({
        message: 'There\'s already a product with that name',
        success: false,
      });
    }
    const addQuery = `INSERT INTO
    products(productname, description, price, quantity, min)
    VALUES($1, $2, $3, $4, $5)
    returning *`;
    const values = [
      body.productname,
      body.description,
      body.price,
      body.quantity,
      body.min,
    ];
    pool.query(addQuery, values, (err, data) => {
      if (err) {
        throw err;
      }
      return res.status(200).json(data.rows[0]);
    });
  });
};

const updateProduct = (req, res) => {
  const {
    body
  } = req;
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
    if (!data.rowCount) {
      return res.status(404).json({
        message: 'Hi! There\'s no product with that id',
        success: false,
      });
    }
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
      return res.status(404).json({
        message: 'Hi! There\'s no product with that id',
        success: false,
      });
    }
    if (err) {
      throw err;
    }
    return res.status(200).json({
      message: 'Deleted!',
      success: true,
    });
  });
};

export {
  getAllProducts,
  getOneProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};