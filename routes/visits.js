const express = require("express");
const db = require("../database/db");
const sendMail = require("../mailer");

const router = express.Router();


// Khách gửi yêu cầu xem phòng
router.post("/", (req, res) => {

    const visit = req.body;

    db.run(
        `
        INSERT INTO visits
        (
            room_id,
            name,
            phone,
            date,
            note
        )
        VALUES (?, ?, ?, ?, ?)
        `,
        [
            visit.room_id,
            visit.name,
            visit.phone,
            visit.date,
            visit.note
        ],
        function(err){

    if(err){
        return res.status(500).json({
            error: "Không lưu được lịch xem phòng"
        });
    }


    sendMail(
        "Có khách đặt lịch xem phòng TrozieVn",
        `
Khách: ${visit.name}

Số điện thoại: ${visit.phone}

Ngày xem: ${visit.date}

Ghi chú: ${visit.note || "Không có"}
        `
    );


    res.json({
        message: "Đã lưu lịch xem phòng và gửi thông báo",
        id: this.lastID
    });

}
    );

});

// Lấy danh sách khách đặt lịch
router.get("/", (req, res) => {

    db.all(
`
SELECT 
    visits.*,
    rooms.title AS room_title
FROM visits
LEFT JOIN rooms 
ON visits.room_id = rooms.id
ORDER BY visits.created_at DESC
`,
[],
(err, rows) => {

    if (err) {
        return res.status(500).json(err);
    }

    res.json(rows);

}
);

});

module.exports = router;