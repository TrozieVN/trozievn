const db = require("./db");
const bcrypt = require("bcrypt");

const phone = "0914187636";
const password = "Hai682007#";

async function createAdmin() {

    db.get(
        "SELECT * FROM users WHERE username = ?",
        [phone],
        async (err, user) => {

            if (err) {
                console.log("Lỗi kiểm tra admin:", err.message);
                return;
            }

            if (user) {
                console.log("Admin đã tồn tại");
                return;
            }

            const hashPassword = await bcrypt.hash(password, 10);

            db.run(
                `
                INSERT INTO users (username, password)
                VALUES (?, ?)
                `,
                [phone, hashPassword],
                function(err) {

                    if (err) {
                        console.log("Lỗi tạo admin:", err.message);
                        return;
                    }

                    console.log("Đã tạo tài khoản admin");
                }
            );
        }
    );
}

createAdmin();