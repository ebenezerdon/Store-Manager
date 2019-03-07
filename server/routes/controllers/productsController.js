/* import moment from 'moment'; */
import pool from '../../models/db';
import uploadToCloudinary from '../../hepers/uploadToCloudinary';

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

const addProduct = async (req, res) => {
  const { body } = req;
  const productImageUrl = await uploadToCloudinary(body.productimage);
  const text = 'SELECT * FROM products WHERE productname = $1';
  pool.query(text, [body.productname], (err, data) => {
    if (data.rowCount) {
      return res.status(402).json({
        message: 'There\'s already a product with that name',
        success: false,
      });
    }
    const addQuery = `INSERT INTO
    products(productname, description, productimage, price, quantity, minallowed)
    VALUES($1, $2, $3, $4, $5, $6)
    returning *`;
    const values = [
      body.productname,
      body.description,
      productImageUrl,
      body.price,
      body.quantity,
      body.minallowed,
    ];
    pool.query(addQuery, values, (err, data) => {
      if (err) {
        throw err;
      }
      return res.status(201).json({
        message: 'Product created',
        'New product': data.rows[0],
        success: true,
      });
    });
  });
};

const updateProduct = (req, res) => {
  const { body } = req;
  const text = `UPDATE products
    SET productname=$1, description=$2, productimage=$3, price=$4, quantity=$5, minallowed=$6
    WHERE id=$7 returning *`;
  const values = [
    body.productname,
    body.description,
    body.productimage,
    body.price,
    body.quantity,
    body.minallowed,
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
      message: 'Product deleted!',
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
