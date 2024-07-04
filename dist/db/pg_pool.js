"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = () => {
    return new pg_1.Pool({
        // connectionString: process.env.POSTGRES_URL,
        database: "TuneTide",
        host: "localhost",
        port: 5432,
        user: "postgres",
        password: "Admin@123"
    });
};
exports.default = pool;
