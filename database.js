import mysql from 'mysql2'
import dotenv from 'dotenv'   //To use the evironmental variable

dotenv.config();   //Configuring dotenv

var pool = mysql.createPool({
    host: process.env.HOST_NAME,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
    
}).promise()    //Creating a connection pool

export async function setData(fname,lname,mail,passw)  //Fn to insert data to the DB
{
    var ql = "INSERT INTO REGWEB(FNAME,LNAME,EMAIL,PASSWORD) VALUES(?,?,?,?)"
    await pool.query(ql,[fname,lname,mail,passw])
    return null
}

export async function ifValid(name,passw)  //Fn to authenticate username & password
{
    var qr = "SELECT * FROM REGWEB WHERE EMAIL=? AND PASSWORD=?"
    var [num] = await pool.query(qr,[name,passw])
    if (num.length>0)
    {
        return true
    }
    else
    {
        return false
    }
}