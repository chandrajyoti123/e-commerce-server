import express from "express";
const app = express()
import mongoose from "mongoose";
app.get('/chandani',(req,res)=>{
    res.send(`
    <h1>this is tara</h1>
    `)

})


const port=5000
app.listen(port,()=>{
    console.log(`this server is running in port ${port}`)
})
