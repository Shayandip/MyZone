const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    user: "root",
    password: "babancr7",
    host: "localhost",
    port: "3306",
    database: "employee"
});

module.exports = pool;