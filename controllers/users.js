require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    register: async (req, res) => {
        const { pool } = req;
        const { name, email, password } = req.body;

        try {
            const encryptedPassword = await bcrypt.hash(password, 10);
            await pool.query(
                "INSERT INTO users (name, email, password) VALUES ($1, $2, $3);",
                [name, email, encryptedPassword]
            );
            res.json({ message: "User created successfully." });
        } catch (err) {
            res.sendStatus(401);
        }
    },
    login: async (req, res) => {
        const { pool } = req;
        const { email, password } = req.body;

        try {
            // Verify email
            const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
            if (rows.size == 0) {
                throw { message: "User does not exist" };
            }

            const user = rows[0];
            // Verify password
            if (!await bcrypt.compare(password, user.password)) {
                throw { message: "User does not exist" };
            }

            const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_SECRET);
            res.json({ accessToken });
        } catch (err) {
            res.sendStatus(401);
        }
    }
};