require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
    getJsonWebTokens: (id) => {
        const accessToken = jwt.sign(
            { id: id },
            process.env.ACCESS_SECRET,
            { expiresIn: "15s" }
        );
        const refreshToken = jwt.sign({ id: id }, process.env.REFRESH_SECRET);
        return { accessToken, refreshToken };
    },
    getAccessToken: (id) => jwt.sign(
        { id: id },
        process.env.ACCESS_SECRET,
        { expiresIn: "15s" }
    )
}