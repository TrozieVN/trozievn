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
                console.log("Lỗi tạo bảng users:", err.message);
                return;
            }

            console.log("Đã tạo bảng users");


            db.run(
                `
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
                `,
                (err) => {

                    if (err) {
                        console.log("Lỗi tạo bảng rooms:", err.message);
                        return;
                    }

                    console.log("Đã tạo bảng rooms");
db.run(
`
CREATE TABLE IF NOT EXISTS visits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    room_id INTEGER,
    name TEXT,
    phone TEXT,
    date TEXT,
    note TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`,
(err) => {

    if (err) {
        console.log("Lỗi tạo bảng visits:", err.message);
        return;
    }

    console.log("Đã tạo bảng visits");

    if (callback) callback();

});


                }
            );

        }
    );
}

module.exports = createTable;