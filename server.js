const express = require("express");
const session = require("express-session");

const app = express();

const authRoute = require("./routes/auth");
const roomsRoute = require("./routes/rooms");
const uploadRoute = require("./routes/upload");
const visitsRoute = require("./routes/visits");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "trozievN_2026_9xK@91",
    resave: false,
    saveUninitialized: false
}));

app.use("/auth", authRoute);
app.use("/api/rooms", roomsRoute);
app.use("/upload", uploadRoute);
app.use("/api/visits", visitsRoute);

app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

const createTable = require("./database/createTable");
const createAdmin = require("./database/createAdmin");

createTable(async () => {

    await createAdmin();

    app.listen(PORT, () => {
        console.log(`Web đang chạy tại port ${PORT}`);
    });

});