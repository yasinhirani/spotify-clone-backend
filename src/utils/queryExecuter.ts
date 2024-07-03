import pool from "../db/pg_pool";

const query = async (query: string, args?: Array<any>) => {
  const client = await pool().connect();

  const result = await client.query(query, args);

  client.release();

  return result.rows && (result.rows.length > 1 ? result.rows : result.rows[0]);
};

export default query;
