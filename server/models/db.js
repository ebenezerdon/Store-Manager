import { Pool } from 'pg';
import { config } from 'dotenv';

config();
let ssl = false;
if (process.env.NODE_ENV === 'production') ssl = true;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl,
});

/**
 * DB Query
 * @param {object} req
 * @param {object} res
 * @returns {object} object
 */
const query = (text, params) => {
  return new Promise((resolve, reject) => {
    pool.query(text, params)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export { pool, query };
