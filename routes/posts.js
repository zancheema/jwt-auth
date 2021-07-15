const router = require("express").Router();
const {getPosts} = require("../controllers/posts");

router.get("/", getPosts);

module.exports = router;