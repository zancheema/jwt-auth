require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

pool.connect()
    .then(() => console.log("DB connection successful."))
    .catch(e => console.log(`Db connection failed: ${e}`));

module.exports = { pool };