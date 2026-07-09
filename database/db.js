const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database/users.db", (err) => {
    if (err) {
        console.log("Lỗi kết nối database:", err);
    } else {
        console.log("Đã kết nối database");
    }
});

module.exports = db;