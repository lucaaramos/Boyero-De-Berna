const mysql = require("mysql2");
require('dotenv').config();

var conn = mysql.createConnection(process.env.DATABASE_URL)
conn.connect((err)=>{
    if(!err){
        console.log("established connection")
    } else {
        console.log("fail connection");
        console.log("error: " + err);
    }
})

module.exports = conn;