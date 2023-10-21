import express from "express";

const app=express();
app.use(express.json())
import dotenv from 'dotenv'
dotenv.config();
import mongoose, {model, Schema } from "mongoose";

const connectMongodb= async()=>{
    const response=await mongoose.connect(process.env.ECOMMERCE_URI)
    if(response){
        console.log("mongodb  added successfully")
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

app.delete('/product/:id', async(req,res)=>{
    const {id}= req.params
     await Product.deleteOne({_id:id})
     

    res.json({
        " result":true,
        " message":`successfully detelted product of Id ${id}`
 
     })

})

app.put('/products/:_id', async(req,res)=>{
      const {_id}=req.params
      const {name, description,price,productImage,brand}=req.body
      await Product.updateOne({_id:_id},{$set:{
        name:name,
        description:description,
        price:price,
        productImage:productImage,
        brand:brand

      }})

      const updatedProductone= await Product.findOne({_id:_id})
      if(!name){
        res.json({
            result:false,
            message:"name is required"
        })

      }
      if(!description){
        res.json({
            result:false,
            message:"name is description"
        })

      }
      if(!price){
        res.json({
            result:false,
            message:"name is price"
        })

      }
      if(!productImage){
        res.json({
            result:false,
            message:"name is productImage"
        })

      }
      if(!brand){
        res.json({
            result:false,
            message:"name is brand"
        })

      }

    res.json({
        " result":true,
         "prductc":updatedProductone,
        " message":`product updated of  Id ${_id}`
 
     })

})

app.patch('/product/:_id', async(req,res)=>{
const {_id}=req.params;
const {name, description,price,productImage,brand}=req.body
const Productone= await Product.findOne({_id:_id})
if(name){
    Productone.name=name
}
if(description){
    Productone.description=description
}
if(price){
    Productone.price=price
}
if(productImage){
    Productone.productImage=productImage
}
if(brand){
    Productone.brand=brand
}

const saved=  await Productone.save()

 
    
    res.json({
        " result":true,
         "prductc":saved,
        " message":`product updated `
 
     })
    
})

const port=8080
app.listen(port,()=>{
    console.log(`this server is running in port ${port}`)
})
