import express from "express";
const app=express();
app.use(express.json())
import dotenv from 'dotenv'
dotenv.config();
import mongoose, {model, Schema } from "mongoose";

const connectMongodb= async()=>{
    const response=await mongoose.connect(process.env.ECOMMERCE_URI)
    if(response){
        console.log("mongodb added successfully")
    }
}
connectMongodb()
const Productschema=new Schema({
     name:String,
     description:String,
     price:Number,
     productImage:String,
     brand:String
})
const Product=mongoose.model('Product',Productschema)


app.post('/product', async (req,res)=>{
    const {name,description,price,productImage,brand}=req.body

    const productObject=new Product({
        name:name,
        description:description,
        price:price,
        productImage:productImage,
        brand:brand

    })
    const savedProduct= await productObject.save()
    res.json({
       " result":true,
        "product":savedProduct,
       " message":"product   added successfully"

    })
})
app.get('/product', async(req,res)=>{
    const allProDoc= await Product.find()
    res.json({
        " result":true,
         "prductc":allProDoc,
        " message":"product   added successfully"
 
     })


})
app.get('/productbyname', async(req,res)=>{
    const {name}=req.query
    const productOne= await Product.findOne({name:name})
    res.json({
        " result":true,
         "prductc":productOne,
        " message":"product   added successfully"
 
     })


})

const port=8080
app.listen(port,()=>{
    console.log(`this server is running in port ${port}`)
})
