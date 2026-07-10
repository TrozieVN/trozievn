const express = require("express");
const db = require("../db");
const sendMail = require("../mailer");

const router = express.Router();


// Khách gửi yêu cầu xem phòng
router.post("/", async (req, res) => {

    const visit = req.body;

    try {

        const result = await db.query(
            `
            INSERT INTO visits
            (
                room_id,
                name,
                phone,
                date,
                note
            )
            VALUES ($1,$2,$3,$4,$5)
            RETURNING id
            `,
            [
                visit.room_id,
                visit.name,
                visit.phone,
                visit.date,
                visit.note
            ]
        );

console.log("Bắt đầu gửi mail");

        await sendMail(
    "Có khách đặt lịch xem phòng TrozieVn",
    `
Khách: ${visit.name}

Số điện thoại: ${visit.phone}

Ngày xem: ${visit.date}

Ghi chú: ${visit.note || "Không có"}
`
);

console.log("Đã chạy xong sendMail");

        res.json({
            message: "Đã lưu lịch xem phòng và gửi thông báo",
            id: result.rows[0].id
        });


    } catch(err){

        console.log(err);

        res.status(500).json({
            error: "Không lưu được lịch xem phòng"
        });

    }

});



// Lấy danh sách khách đặt lịch
router.get("/", async (req, res) => {

    try {

        const result = await db.query(
            `
            SELECT 
                visits.*,
                rooms.title AS room_title
            FROM visits
            LEFT JOIN rooms
            ON visits.room_id = rooms.id
            ORDER BY visits.created_at DESC
            `
        );


        res.json(result.rows);


    } catch(err){

        console.log(err);
        res.status(500).json(err);

    }

});


module.exports = router;