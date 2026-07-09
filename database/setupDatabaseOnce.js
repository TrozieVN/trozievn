const createTable = require("./createTable");
const createAdmin = require("./createAdmin");

createTable(() => {
    createAdmin();
});