const db = require("./db");

db.all("SELECT * FROM rooms", (err, rows) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log(rows);
});