const db = require("./db");
const bcrypt = require("bcrypt");

const phone = "0914187636";
const password = "Hai682007#";

async function createAdmin() {

    try {

        const check = await db.query(
            "SELECT * FROM users WHERE username = $1",
            [phone]
        );


        if (check.rows.length > 0) {
            console.log("Admin đã tồn tại");
            return;
        }


        const hash = await bcrypt.hash(password, 10);


        await db.query(
            "INSERT INTO users(username,password) VALUES($1,$2)",
            [phone, hash]
        );


        console.log("Đã tạo tài khoản admin");


    } catch (err) {

        console.log("Lỗi tạo admin:", err.message);

    }
}

module.exports = createAdmin;