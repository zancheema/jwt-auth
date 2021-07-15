require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    const { pool } = req;
    const { authorization } = req.headers;
    if (!authorization) return res.sendStatus(403);
    const token = authorization.split(" ")[1];
    if (!token) return res.sendStatus(403);

    try {
        const { id } = jwt.verify(token, process.env.ACCESS_SECRET);
        const {rows} = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        if (rows.size == 0) throw {message: "User does not exist"};
        next();
    } catch (err) {
        return res.status(403).json({ message: err.message });
    }
}