const mysql = require('mysql');
const dotenv = require('dotenv')
dotenv.config()

const db = mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    database:process.env.database,
    password:''
})
db.connect((err)=>{
    if(err){
        console.log(err)
    }
    else{
    console.log('connected to the database')
    }
})
db.query(`CREATE TABLE  IF NOT EXISTS users(
    userName VARCHAR(200) NOT NULL,
    email varchar(200) NOT NULL ,
    password VARCHAR(100) NOT NULL 
    )`,(err)=>{
        if(err){
            console.log(err)
        }else{
        console.log('created')
        }
    })




module.exports = db;