require("dotenv").config();
const jwt = require("jsonwebtoken");
const { getAccessToken } = require("../utils/authUtil");

module.exports = async (req, res, next) => {
    const { pool } = req;
    const { authorization } = req.headers;
    if (!authorization) return res.sendStatus(403);
    const [accessToken, refreshToken] = authorization.split(" ").slice(1, 3);
    if (!accessToken || !refreshToken) return res.sendStatus(403);

    let id;
    try {
        id = jwt.verify(accessToken, process.env.ACCESS_SECRET);
    }  catch (err) {
        id = jwt.verify(refreshToken, process.env.REFRESH_SECRET).id;
    }
    try {
        req.accessToken = await getAccessToken(id);
        const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        if (rows.size == 0) throw { message: "User does not exist" };
        next();
    } catch (err) {
        return res.status(403).json({ message: err.message });
    }
}