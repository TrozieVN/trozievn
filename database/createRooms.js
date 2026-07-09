const db = require("./db");

db.run(`
CREATE TABLE IF NOT EXISTS rooms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    province TEXT,
    district TEXT,
    ward TEXT,
    address TEXT,
    type TEXT,
    price TEXT,
    area TEXT,
    status TEXT,
    photo TEXT,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`, (err) => {

    if (err) {
        console.log("Lỗi tạo bảng:", err);
    } else {
        console.log("Đã tạo bảng rooms");
    }

});