const express = require("express");
const db = require("../db");
const fs = require("fs");
const path = require("path");

const router = express.Router();


// Lấy danh sách phòng
router.get("/", async (req, res) => {

    try {

        const result = await db.query(
            "SELECT * FROM rooms ORDER BY created_at DESC"
        );

        res.json(result.rows);

    } catch (err) {

        console.log(err);
        res.status(500).json(err);

    }

});


// Thêm phòng
router.post("/", async (req, res) => {

    const room = req.body;

    try {

        const result = await db.query(
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
            VALUES
            ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
            RETURNING id
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
            ]
        );


        res.json({
            message: "Thêm phòng thành công",
            id: result.rows[0].id
        });


    } catch (err) {

        console.log(err);
        res.status(500).json(err);

    }

});


// Sửa phòng
router.put("/:id", async (req, res) => {

    const id = req.params.id;
    const room = req.body;


    try {

        const old = await db.query(
            "SELECT photo FROM rooms WHERE id = $1",
            [id]
        );


        const oldRoom = old.rows[0];


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



        await db.query(
            `
            UPDATE rooms SET

                title = $1,
                province = $2,
                district = $3,
                ward = $4,
                address = $5,
                type = $6,
                price = $7,
                area = $8,
                status = $9,
                photo = $10,
                description = $11

            WHERE id = $12
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
            ]
        );


        res.json({
            message:"Cập nhật phòng thành công"
        });


    } catch(err){

        console.log(err);
        res.status(500).json(err);

    }

});


module.exports = router;