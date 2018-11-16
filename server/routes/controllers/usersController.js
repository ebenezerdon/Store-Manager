import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import pool from '../../models/db';

dotenv.config();
const secret = process.env.SECRET_KEY;

const getAllUsers = (req, res) => {
  const text = 'SELECT * FROM users';
  pool.query(text, (err, data) => {
    if (err) throw err;
    return res.status(200).json(data.rows);
  });
};

const getOneUser = (req, res) => {
  const text = 'SELECT * FROM users WHERE id = $1';
  pool.query(text, [req.params.id], (err, data) => {
    if (!data.rowCount) {
      return res.status(404).json('Hi! There\'s no user with that id');
    }
    if (err) throw err;
    return res.status(200).json(data.rows[0]);
  });
};

const addUser = (req, res) => {
  const {
    body
  } = req;
  const text = 'SELECT * FROM users WHERE emailaddress = $1';
  pool.query(text, [body.emailaddress], (err, data) => {
    if (data.rowCount) {
      return res.status(400).json({
        message: 'There\'s already a user with that email address. Maybe you want to login?',
        success: false,
      });
    }
    const addQuery = `INSERT INTO
        users(fullname, emailaddress, phonenumber, userimage, password, role)
        VALUES($1, $2, $3, $4, $5, $6)
        returning *`;
    const values = [
      body.fullname,
      body.emailaddress,
      body.phonenumber,
      body.userimage,
      body.password,
      body.role,
    ];
    pool.query(addQuery, values, (err, data) => {
      if (err) throw err;
      return res.status(201).json({
        message: 'User successfully created',
        success: true,
        userDetails: data.rows[0],
      });
    });
  });
};

const updateUser = (req, res) => {
  const {
    body
  } = req;
  const text = `UPDATE users
    SET fullname=$1, emailaddress=$2, phonenumber=$3, userimage=$4, password=$5, role=$6
    WHERE id=$7 returning *`;
  const values = [
    body.fullname,
    body.emailaddress,
    body.phonenumber,
    body.userimage,
    body.password,
    body.role,
    req.params.id,
  ];
  pool.query(text, values, (err, data) => {
    if (!data.rowCount) {
      return res.status(200).json({
        message: 'Hi! There\'s no user with that id',
        success: false,
      });
    }
    if (err) throw err;
    return res.status(200).json(data.rows[0]);
  });
};

const makeAdmin = (req, res) => {
  const text = `UPDATE users
    SET role=$1
    WHERE id=$2 returning *`;
  const values = [
    'admin',
    req.params.id,
  ];
  pool.query(text, values, (err, data) => {
    if (!data.rowCount) {
      return res.status(200).json({
        message: 'Hi! There\'s no user with that id',
        success: false,
      });
    }
    if (err) throw err;
    return res.status(200).json(data.rows[0]);
  });
};

const deleteUser = (req, res) => {
  const text = 'DELETE FROM users WHERE id=$1 returning *';
  pool.query(text, [req.params.id], (err, data) => {
    if (!data.rowCount) {
      return res.status(200).json({
        message: 'Hi! There\'s no user with that id',
        success: false,
      });
    }
    if (err) throw err;
    return res.status(200).json({
      message: 'The user has been removed',
      success: true,
    });
  });
};

const loginUser = (req, res) => {
  const { body } = req;
  const query = {
    text: `SELECT * FROM users WHERE
    emailaddress = $1 AND password = $2`,
    values: [
      body.emailaddress,
      body.password,
    ],
  };
  pool.query(query).then((data) => {
    if (!data.rowCount) return (res.status(404).json('Hi! Can you check again? Ther\'s no user with those details'));
    const token = jwt.sign(data.rows[0], secret, {
      expiresIn: '24hrs',
    });

    return res.status(201).json({
      token,
      role: jwt.verify(token, secret, (error, decoded) => decoded.role),
      success: true,
    });
  }).catch(err => (res.status(500).json(err)));
};

export {
  getAllUsers,
  getOneUser,
  addUser,
  updateUser,
  deleteUser,
  loginUser,
  makeAdmin,
};