const bcrypt = require("bcrypt");

const passwordNhap = "Hai682007#";

const hashTrongDB = "$2b$10$tBXuQIXzup9ki2nxdnhzpOM/m3Z1A8UXckfeloxJXvQyTjCCQDoFe";

bcrypt.compare(passwordNhap, hashTrongDB)
.then(result => {
    console.log("Kết quả:", result);
});