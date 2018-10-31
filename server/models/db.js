import { Pool } from 'pg';
import { config } from 'dotenv';

config();
let ssl = false;
if (process.env.NODE_ENV === 'production') ssl = true;
let connectionString = process.env.DATABASE_URL;
if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.DATABASE_URL_TEST;
}
const pool = new Pool({
  connectionString,
  ssl,
});

export default pool;
