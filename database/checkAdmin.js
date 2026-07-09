const db = require("./db");

db.all("SELECT * FROM users", (err, rows) => {
    if (err) {
        console.log("Lỗi:", err.message);
        return;
    }

    console.log(rows);
});