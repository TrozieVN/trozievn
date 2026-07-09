const express = require("express");
const db = require("../database/db");
const fs = require("fs");
const path = require("path");

const router = express.Router();


// Lấy danh sách phòng
router.get("/", (req, res) => {

    db.all(
        "SELECT * FROM rooms ORDER BY created_at DESC",
        [],
        (err, rows) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(rows);

        }
    );

});


// Thêm phòng
router.post("/", (req, res) => {

    const room = req.body;

    db.run(
        `
        INSERT INTO rooms
        (
        title,
        province,
        district,
        ward,
        address,
        type,
        price,
        area,
        status,
        photo,
        description
        )
        VALUES (?,?,?,?,?,?,?,?,?,?,?)
        `,
        [
            room.title,
            room.province,
            room.district,
            room.ward,
            room.address,
            room.type,
            room.price,
            room.area,
            room.status,
            room.photo,
            room.description
        ],

        function(err){

            if(err){
                return res.status(500).json(err);
            }

            res.json({
                message:"Thêm phòng thành công",
                id:this.lastID
            });

        }
    );

});
// Sửa phòng
router.put("/:id", (req, res) => {

    const id = req.params.id;
    const room = req.body;

    db.get(
        "SELECT photo FROM rooms WHERE id = ?",
        [id],
        (err, oldRoom) => {

            if (err) {
                return res.status(500).json(err);
            }
        if (
            oldRoom &&
            oldRoom.photo &&
            room.photo &&
            oldRoom.photo !== room.photo
        ) {
            const oldImagePath = path.join(
                __dirname,
                "..",
                "public",
                oldRoom.photo
            );

            fs.unlink(oldImagePath, () => {});
        }

    db.run(
        `
        UPDATE rooms SET
        title = ?,
        province = ?,
        district = ?,
        ward = ?,
        address = ?,
        type = ?,
        price = ?,
        area = ?,
        status = ?,
        photo = ?,
        description = ?
        WHERE id = ?
        `,
        [
            room.title,
            room.province,
            room.district,
            room.ward,
            room.address,
            room.type,
            room.price,
            room.area,
            room.status,
            room.photo,
            room.description,
            id
        ],

        function(err){

            if(err){
                return res.status(500).json(err);
            }

            res.json({
                message:"Cập nhật phòng thành công"
            });

        }
    );
        }
    );

});

module.exports = router;