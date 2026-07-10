const db = require("../db");

async function createTable(callback) {

    try {

        await db.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username TEXT UNIQUE,
                password TEXT
            )
        `);

        console.log("Đã tạo bảng users");


        await db.query(`
            CREATE TABLE IF NOT EXISTS rooms (
                id SERIAL PRIMARY KEY,
                title TEXT,
                province TEXT,
                district TEXT,
                ward TEXT,
                address TEXT,
                type TEXT,
                price TEXT,
                area TEXT,
                status TEXT,
                photo TEXT,
                description TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log("Đã tạo bảng rooms");


        await db.query(`
            CREATE TABLE IF NOT EXISTS visits (
                id SERIAL PRIMARY KEY,
                room_id INTEGER,
                name TEXT,
                phone TEXT,
                date TEXT,
                note TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log("Đã tạo bảng visits");


        if (callback) callback();

    } catch (err) {

        console.log("Lỗi tạo bảng:", err.message);

    }

}

module.exports = createTable;