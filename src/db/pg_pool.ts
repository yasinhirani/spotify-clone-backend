import { Pool } from "pg";

const pool = () => {
  return new Pool({
    connectionString: process.env.POSTGRES_URL,
  });
};

export default pool;
