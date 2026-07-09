const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });


router.post("/", upload.single("photo"), (req, res) => {

    if (!req.file) {
        return res.status(400).json({
            message: "Chưa có ảnh"
        });
    }

    res.json({
        message: "Upload thành công",
        url: "/uploads/" + req.file.filename
    });

});


module.exports = router;