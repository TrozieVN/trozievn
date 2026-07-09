const db = require("./db");

db.run(`
CREATE TABLE IF NOT EXISTS visits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    room_id INTEGER,
    name TEXT,
    phone TEXT,
    date TEXT,
    note TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`, (err) => {
    if (err) {
        console.log("Lỗi tạo bảng:", err);
    } else {
        console.log("Đã tạo bảng visits");
    }

    db.close();
});