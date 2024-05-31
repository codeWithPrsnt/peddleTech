'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'next/navigation';
import { products } from '@/types';
import Form from '../../../components/Form'
var Barcode = require('react-barcode');

const Page = () => {
     const params = useParams();
     const [product,setProduct]=useState<products>();
     const {productId}=params;
    const onSubmit = async(data:any)=>{
        let response = await axios.post(`http://localhost:3001/update?id=${productId}&&upc_code=${data.UPC}&&brand=${data.model}&&product_name=${data.product_name}`);
        console.log('response',response)
        if(response)alert('product updated successfully!')
    }
    const fetchProduct=async()=>{
        try {
            let response = await axios.get('http://localhost:3001/product?id='+productId);
            console.log('response',response.data[0])
            setProduct(response.data[0])
        } catch (error) {
            
        }
        
    }
    useEffect(()=>{
        fetchProduct()
    },[])
  return (
    <div className='text-black p-20 '>
        <div className='flex flex-row'>
        <div className='pr-4'>{product && <Barcode value={parseFloat(product.upc_code)}/>}</div>
        <Form product={product} onSubmit ={onSubmit}/>
        </div>

    </div>
  )
}

export default Page