require("dotenv").config();
const express = require("express");
const pool = require("./middlewares/pool");
const auth = require("./middlewares/auth");
const userRouter = require("./routes/users");
const postRouter = require('./routes/posts');

const app = express();

// Middlewares
app.use(express.json());
app.use(pool);
app.use("/api/posts", auth);
// Routes
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

app.get("/", (req, res) => res.send("Hello there!"));
app.post("/", (req, res) => res.send("Post on / accepeted."))

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
});