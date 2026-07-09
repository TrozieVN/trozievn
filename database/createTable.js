const db = require("./db");

function createTable(callback) {

    db.run(
        `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        )
        `,
        (err) => {

            if (err) {
                console.log("Lỗi tạo bảng:", err.message);
                return;
            }

            console.log("Đã tạo bảng users");

            if (callback) callback();
        }
    );
}

module.exports = createTable;