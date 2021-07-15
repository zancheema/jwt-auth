const { pool } = require("../dbConnection");

module.exports = (req, res, next) => {
    req.pool = pool;
    next();
}