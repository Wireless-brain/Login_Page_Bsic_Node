import  express from 'express'
import { ifValid, setData } from './database.js'      //To use the Fns in this file
import formidable from 'express-formidable'

var app = express()       //Create an express app

app.use(formidable())     //For accessing form data
app.use(express.json())   //To make sure to accept .json data
app.use("/assets",express.static("assets"))      //To include the .css file

app.get("/",async (req,res)=>
{
    res.sendFile(process.cwd() + "/firstPage.html")
})

app.get("/loginReg", async (req,res)=>
{
    res.sendFile(process.cwd() + "/loginReg.html")
})

app.get("/login", async (req,res)=>
{
    res.sendFile(process.cwd() + "/login.html")
})

app.post("/loginReg",async (req,res)=> //To register
{    
    var fname = req.fields.first_name
    var lname = req.fields.last_name
    var mail = req.fields.email
    var pas = req.fields.new_password

    await setData(fname,lname,mail,pas)
   
    res.redirect("/")
})

app.post("/login", async (req,res)=> {

    var mai = req.fields.email
    var passw = req.fields.new_password

    if (await ifValid(mai,passw))
    {
        res.sendFile(process.cwd() + "/welcome.html")
    }
    else
    {
        res.redirect("/login")
    }
})

app.listen(8080,()=>{

    console.log("\n\tServer is running on port 8080!!\n")
})