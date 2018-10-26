import { Pool } from 'pg';
import { config } from 'dotenv';

config();
let ssl = false;
if (process.env.NODE_ENV === 'production') ssl = true;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl,
});

export default pool;
