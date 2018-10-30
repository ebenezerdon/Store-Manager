import jwt from 'jsonwebtoken';
import config from '../../configuration/config';
import pool from '../../models/db';

const { secret } = config;

const getAllUsers = (req, res) => {
  const text = 'SELECT * FROM users';
  pool.query(text, (err, data) => {
    if (err) {
      throw err;
    }
    return res.status(200).json(data.rows);
  });
};

const getOneUser = (req, res) => {
  const text = 'SELECT * FROM users WHERE id = $1';
  pool.query(text, [req.params.id], (err, data) => {
    if (!data.rowCount) {
      return res.status(404).json('Hi! There\'s no user with that id');
    }
    if (err) {
      throw err;
    }
    return res.status(200).json(data.rows[0]);
  });
};

const addUser = (req, res) => {
  const { body } = req;
  const text = `INSERT INTO
    users(fullname, emailaddress, password, type)
    VALUES($1, $2, $3, $4)
    returning *`;
  const values = [
    body.fullname,
    body.emailaddress,
    body.password,
    body.type,
  ];
  pool.query(text, values, (err, data) => {
    if (err) {
      throw err;
    }
    return res.status(200).json(data.rows[0]);
  });
};

const updateUser = (req, res) => {
  const { body } = req;
  const text = `UPDATE users
    SET fullname=$1, emailaddress=$2, password=$3, type=$4
    WHERE id=$5 returning *`;
  const values = [
    body.fullname,
    body.emailaddress,
    body.password,
    body.type,
    req.params.id,
  ];
  pool.query(text, values, (err, data) => {
    if (!data.rowCount) {
      return res.status(404).json('Hi! There\'s no user with that id');
    }
    if (err) {
      throw err;
    }
    return res.status(200).json(data.rows[0]);
  });
};

const deleteUser = (req, res) => {
  const text = 'DELETE FROM users WHERE id=$1 returning *';
  pool.query(text, [req.params.id], (err, data) => {
    if (!data.rowCount) {
      return res.status(404).json('Hi! There\'s no user with that id');
    }
    if (err) {
      throw err;
    }
    return res.status(204).json('So.. The user has been removed');
  });
};

const loginUser = (req, res) => {
  const { body } = req;
  const text = `SELECT * FROM users WHERE
    emailaddress=$1 AND password=$2 AND type=$3`;
  const values = [
    body.emailaddress,
    body.description,
    body.type,
  ];
  pool.query(text, values, (err, data) => {
    if (err) {
      return (
        res.status(404).json({
          message: 'Hi! Can you check again? Ther\'s no user with that id',
        }));
    }
    const token = jwt.sign(data.rows[0], secret, {
      expiresIn: '24hr',
    });
    return res.status(200).json(token);
  });
};

export {
  getAllUsers,
  getOneUser,
  addUser,
  updateUser,
  deleteUser,
  loginUser,
};
