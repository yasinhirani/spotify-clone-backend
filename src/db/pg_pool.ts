import { Pool } from "pg";

const pool = () => {
  return new Pool({
    // connectionString: process.env.POSTGRES_URL,
    database: "TuneTide",
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "Admin@123"
  });
};

export default pool;
