const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');
const utils = require('./utils');
app.use(cors())
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With , Content-Type, Accept')
    next()
})


app.get('/products',async(req,res)=>{
    try {
        let response = await utils.getProducts();
        res.status(200).json(response);
    } catch (error) {
        
    }
})
app.get('/product',async(req,res)=>{
   try {
    let productFound = await utils.getProduct(req.query.id)
    console.log(productFound)
    if(productFound)res.status(200).json(productFound)
    res.status(404).json('product not found')
   } catch (error) {
    
   }
})
app.get('/insertData',async(req,res)=>{
   try {
    let response = await utils.insertProducts();
    console.log(response)
    res.status(200).json('Data inserted successfully')
   } catch (error) {
    
   }
})
app.get('/search',async(req,res,next)=>{
    try {
        let response = await utils.search(req.query.text.toLowerCase());
        console.log(response)
        res.status(200).json(response)
    } catch (error) {
        
    }
})
app.post('/update',async(req,res,next)=>{
    try {
        let product = {
            id:req.query.id,
            upc_code:req.query.upc_code,
            brand:req.query.brand,
            product_name:req.query.product_name
        }
        let response = await utils.update(product)
        console.log('resp onseUpdate',response)
        res.status(200).json(response)
    } catch (error) {
        
    }
})

app.listen(3001,()=>console.log('server listening at 3001'))