import React, { useEffect, useState } from 'react'
import Card from './Card'
import Slot from './Slot'
import FormInput from './FormInput'
import FormButton from './FormButton'
import { useRouter } from "next/navigation";
import { products } from '@/types'

const Form = ({product,onSubmit}:{product:products | undefined; onSubmit:({})=>void}) => {
    const router = useRouter();
    const [login,setLogin]=useState({
        value:{model:'',product_name:'',UPC:''},
        error:{model:'',product_name:'',UPC:''},
        valid:{model:true,product_name:true,UPC:true},
        formValid:true
})
    const handleChange=(e:any)=>{
        //console.log(e)
        const name = e.target.name;
        const value = e.target.value;
        const newState={...login,...login.error,...login.valid}
        newState.value={
            ...login.value,
            [e.target.name]:e.target.value

        }
        let message='';
        let flag=true;
        switch(name){
            case 'model' :{
                if (value.length<1){
                    message=`${name} can't be empty`;
                    flag=false;
                }else{
                    message='';
                    flag=true;
                }
                
                break;
            }
            case 'product_name':{
                if (value.length<1){
                    message=`${name} can't be empty`;
                    flag=false;
                }else{
                    message='';
                    flag=true;
                }
                
                break;
            }
            case 'UPC':{
                if (value.length!==12){
                    message=`${name} should be of 12 characters`;
                    flag=false;
                }else{
                    message='';
                    flag=true
                }
                
                break;
            }
        

        }
        newState.error={
            ...login.error,
            [name]:message
        }
        newState.valid={
            ...login.valid,
            [name]:flag
        }
        newState.formValid=newState.valid.model && newState.valid.product_name && newState.valid.UPC;
        setLogin(newState)
    }
    const handleSubmit =()=>{
        
        onSubmit({...login.value})
    }

    useEffect(()=>{
        if (!product)return
        let newState = {...login}
        newState.error={...login.error}
        newState.valid={...login.valid}
        newState.formValid=login.formValid
        newState.value={
            ...login.value,
            model:product?.brand,
            product_name:product?.product_name,
            UPC:product?.upc_code,
        }
        setLogin(newState)
    },[product])
    
  return (
    <div style={{width:400}}>
    <Card>
        
        <Slot slot = 'body'>
            <div>
                <FormInput name='model' value={login.value.model} error={login.error.model} onChange={handleChange} placeholder='Enter model' label='Model'/>
                <FormInput name="product_name" type='text' value={login.value.product_name} error={login.error.product_name} onChange={handleChange} placeholder="Enter product name"  label="Product Name"/>
                <FormInput name="UPC" type='number' value={login.value.UPC} error={login.error.UPC} onChange={handleChange} placeholder="Enter upc code"  label=" Barcode"/>
            </div>
        </Slot>
        <Slot slot='footer'>
            <div className='mr-4'><FormButton disabled={false} onClick={()=>router.push('/')}>Cancel</FormButton></div>
            <FormButton disabled={!login.formValid} onClick={handleSubmit}>Update</FormButton>
            
        </Slot>
    </Card>
    </div>
  )
}

export default Form