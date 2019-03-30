import { Pool } from "mysql";

const dotenv = require('dotenv');
const mysql = require('mysql');
dotenv.config();

const pool: Pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

module.exports = pool;
