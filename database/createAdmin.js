const db = require("./db");
const bcrypt = require("bcrypt");

const phone = "0914187636";
const password = "Hai682007#";

async function createAdmin() {

    const hashPassword = await bcrypt.hash(password, 10);

    db.run(
        `
        INSERT INTO users (username, password)
        VALUES (?, ?)
        `,
        [phone, hashPassword],
        function(err) {

            if (err) {
                console.log("Lỗi:", err.message);
                return;
            }

            console.log("Đã tạo tài khoản admin");
        }
    );
}

createAdmin();