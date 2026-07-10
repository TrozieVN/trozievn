const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db");

const router = express.Router();

router.post("/login", async (req, res) => {

    const { username, password } = req.body;

    console.log("USERNAME NHẬN:", username);

    try {

        const result = await db.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        );


        const user = result.rows[0];

        console.log("USER TRONG DB:", user);


        if (!user) {
            return res.send("Sai tài khoản hoặc mật khẩu");
        }


        const checkPassword = await bcrypt.compare(
            password,
            user.password
        );


        console.log("PASSWORD ĐÚNG:", checkPassword);


        if (!checkPassword) {
            return res.send("Sai tài khoản hoặc mật khẩu");
        }


        req.session.admin = true;

        res.send("Đăng nhập thành công");


    } catch (err) {

        console.log("Lỗi database:", err.message);
        res.status(500).send("Lỗi server");

    }

});


module.exports = router;