import express from "express";
import { run } from "./db/db";
require('dotenv').config()
import cors from "cors";
interface data {
    name:String;
    contact:String;
    bloodGroup:String;
    location:String;
}
 
interface body {
    bloodType:String;
    location:String;
}

const app = express()
const db = run()
app.use(express.json())


app.use(cors()) 

app.get("/", (req, res)=>{
    return res.json({
        msg:"Hello"
    })
})

app.post("/", async (req, res)=>{
    const data : data = await req.body;
    try{
        const res = await (await db).query(`INSERT INTO donors (name, number, bloodtype, location) VALUES ($1, $2, $3, $4)`, [data.name,data.contact,data.bloodGroup,data.location])
    }catch(e){
        console.log(e)
        return res.json({
            msg:"Data rejected"
        })
    }
    return res.json({
        msg:"Data Accepted"
    })
})

app.post("/find", async (req, res)=>{
    const body:body = await req.body
    var data;
    try{
        data = await (await db).query(`SELECT * FROM donors WHERE bloodtype=$1 AND location=$2`,[body.bloodType,body.location])
    }catch(e){
        console.log(e)
    }
    return res.json({
        data:data?.rows
    })
})

app.listen(3000, ()=>{
    console.log("http://localhost:3000/")
})