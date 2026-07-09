const db = require("./db");

const rooms = [
    {
        title: "Studio cửa sổ lớn Quận 1",
        province: "TP. Hồ Chí Minh",
        district: "Quận 1",
        ward: "Phường Bến Thành",
        address: "Nguyễn Trãi, Phường Bến Thành, Quận 1",
        type: "Studio",
        price: "6800000",
        area: "28",
        status: "Còn trống",
        photo: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
        description: "Phòng mới, gần trung tâm."
    },

    {
        title: "Phòng dịch vụ gần biển Mỹ Khê",
        province: "Đà Nẵng",
        district: "Sơn Trà",
        ward: "Phường An Hải",
        address: "An Thượng, Sơn Trà",
        type: "Phòng dịch vụ",
        price: "4300000",
        area: "22",
        status: "Còn trống",
        photo: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
        description: "Gần biển, có dịch vụ."
    }
];


rooms.forEach(room => {

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
        err => {
            if(err) console.log(err);
        }
    );

});


console.log("Đã thêm phòng mẫu");