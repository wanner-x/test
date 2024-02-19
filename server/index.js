const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.json());

const connection = mysql.createConnection({
    host: 'example.com',
    user: 'myuser',
    password: 'mypassword',
    database: 'mydatabase'
});

app.get('/search', (req, res) => {
    const user = req.query.user;
    // 注意：以下 SQL 查询容易受到 SQL 注入攻击
    const query = `SELECT * FROM users WHERE username = '${user}'`;

    connection.query(query, (error, results) => {
        if (error) {
            return res.status(500).send('Error executing the query');
        }
        res.json(results);
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
