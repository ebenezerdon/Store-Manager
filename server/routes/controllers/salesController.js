/* import moment from 'moment'; */
import pool from '../../models/db';

const getAllsales = (req, res) => {
  const text = 'SELECT * FROM sales';
  pool.query(text, (err, data) => {
    if (err) {
      throw err;
    }
    return res.status(200).json(data.rows);
  });
};

const getOneSale = (req, res) => {
  const text = 'SELECT * FROM sales WHERE id = $1';
  pool.query(text, [req.params.id], (err, data) => {
    if (!data.rowCount) {
      return res.status(404).json('Hi! There\'s no sale record with that id');
    }
    if (err) {
      throw err;
    }
    return res.status(200).json(data.rows[0]);
  });
};

const addSale = (req, res) => {
  const { body } = req;
  const text = `INSERT INTO
    sales(productname, productId, attendant_id, price, quantity)
    VALUES($1, $2, $3, $4, $5)
    returning *`;
  const values = [
    body.productname,
    body.productId,
    body.price,
    body.attendant_id,
    body.quantity,
  ];
  pool.query(text, values, (err, data) => {
    if (!data.rowCount) {
      return res.status(404).json('Hi! There\'s no sale record with that id');
    }
    if (err) {
      throw err;
    }
    return res.status(200).json(data.rows[0]);
  });
};

const updateSale = (req, res) => {
  console.log(req.body);
  const { body } = req;
  const text = `UPDATE sales
    SET productname=$1, productId=$2, price=$3, attendant_id=$4, quantity=$5
    WHERE id=$6 returning *`;
  const values = [
    body.productname,
    body.productId,
    body.price,
    body.attendant_id,
    body.quantity,
    req.params.id,
  ];
  pool.query(text, values, (err, data) => {
    if (err) {
      throw err;
    }
    return res.status(200).json(data.rows[0]);
  });
};

const deleteSale = (req, res) => {
  const text = 'DELETE FROM sales WHERE id=$1 returning *';
  pool.query(text, [req.params.id], (err, data) => {
    if (!data.rowCount) {
      return res.status(404).json('Hi! There\'s no sale record with that id');
    }
    if (err) {
      throw err;
    }
    return res.status(204).json('Cool. Deleted!');
  });
};

export {
  getAllsales,
  getOneSale,
  addSale,
  updateSale,
  deleteSale,
};