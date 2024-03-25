const mysql = require("mysql2");
require('dotenv').config();

var conn = mysql.createPool({
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB,
    port: process.env.MYSQL_ADDON_PORT,
    uri: process.env.MYSQL_ADDON_URI,
})
conn.getConnection((err)=>{
    if(!err){
        console.log("established connection")
    } else {
        console.log("fail connection");
        console.log("error: " + err);
    }
})

module.exports = conn;