module.exports = {
    getPosts: async (req, res) => {
        const { pool } = req;
        try {
            const { rows } = await pool.query("SELECT * FROM posts");
            const posts = rows.map(r => ({
                id: r.id,
                userId: r.user_id,
                text: r.text
            }));
            res.json(posts);
        } catch (err) {
            res.sendStatus(401);
        }
    }
}