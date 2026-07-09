const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../database/db");

const router = express.Router();

router.post("/login", (req, res) => {

    const { username, password } = req.body;

    db.get(
        "SELECT * FROM users WHERE username = ?",
        [username],
        async (err, user) => {

           if (err) {
    console.log("Lỗi login:", err);
    return res.status(500).send("Lỗi server");
}

            if (!user) {
                return res.send("Sai tài khoản hoặc mật khẩu");
            }

            const checkPassword = await bcrypt.compare(
                password,
                user.password
            );

            if (!checkPassword) {
                return res.send("Sai tài khoản hoặc mật khẩu");
            }

            req.session.admin = true;

            res.send("Đăng nhập thành công");
        }
    );

});

module.exports = router;