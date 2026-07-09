const db = require("./db");

db.run(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
)
`, (err) => {
    if (err) {
        console.log("Lỗi tạo bảng:", err);
    } else {
        console.log("Đã tạo bảng users");
    }
});