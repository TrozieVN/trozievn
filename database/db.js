const { Pool } = require("pg");
require("dotenv").config();

const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

db.connect()
    .then(() => {
        console.log("Đã kết nối PostgreSQL");
    })
    .catch((err) => {
        console.log("Lỗi PostgreSQL:", err.message);
    });

module.exports = db;