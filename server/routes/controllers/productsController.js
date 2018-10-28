import moment from 'moment';
import pool from '../../models/db';


const getAllProducts = (req, res) => {
  console.log(req.body.productName);
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
    if (err) {
      throw err;
    }
    return res.status(200).json(data.rows[0]);
  });
};

const addProduct = (req, res) => {
  console.log(req.body.productName);
  const { body } = req;
  const text = `INSERT INTO
    products(productName, description, price, quantity)
    VALUES($1, $2, $3, $4)
    returning *`;
  const values = [
    body.productName,
    body.description,
    body.price,
    body.quantity,
  ];
  pool.query(text, values, (err, data) => {
    if (err) {
      throw err;
    }
    return res.status(200).json(data.rows[0]);
  });
};

const updateProduct = (req, res) => {
  const findQuery = 'SELECT * FROM products WHERE id=$1';
  const updateOneQuery = `UPDATE products
    SET name=$1, description=$2, price=$3, quantity=$4, min=$5, modifiedAt=$6
    WHERE id=$7 returning *`;
  try {
    const {
      rows
    } = query(findQuery, [req.params.id]);
    if (!rows[0]) {
      return res.status(404).json('Hi! There\'s no product with that id');
    }
    const values = [
      req.body.name || rows[0].name,
      req.body.descrioption || rows[0].description,
      req.body.price || rows[0].price,
      req.body.quantity || rows[0].quantity,
      req.body.min || rows[0].min,
      moment(new Date()),
      req.params.id,
    ];
    const response = query(updateOneQuery, values);
    return res.status(200).json(response.rows[0]);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const deleteProduct = (req, res) => {
  const deleteQuery = 'DELETE FROM products WHERE id=$1 returning *';
  try {
    const {
      rows
    } = query(deleteQuery, [req.params.id]);
    if (!rows[0]) {
      return res.status(404).json('Hi! There\'s no product with that id');
    }
    return res.status(204).json('Cool. Deleted!');
  } catch (error) {
    return res.status(400).send(error);
  }
};

export {
  getAllProducts,
  getOneProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};