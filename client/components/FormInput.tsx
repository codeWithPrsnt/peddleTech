
import React,{InputHTMLAttributes} from 'react'

const FormInput = ({
    type='text',
    name,
    value,
    placeholder="placeholder",
    required = false,
    readOnly = false,
    disabled =false,
    multiline=false,
    onChange,
    label,
    error
}:{
    type?:InputHTMLAttributes<unknown>['type'];
    name:string;
    value:string | number;
    placeholder:string;
    required?:boolean;
    disabled?:boolean;
    readOnly?:boolean;
    multiline?:boolean;
    onChange:Function;
    label?:string;
    error?: string;
}
    
) => {
    const handleChange = (e:any)=>{
        if(onChange && e && e.target)onChange(e)
    }
  return (
    <div style={{marginTop:10}}>
        {label && <label style={{marginBottom:10,display:'block',color:'hsl(0,0%,21%)'}}>
            {label} 
        </label>}
        <div>
            {
                multiline?(
                <textarea
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    style={{minHeight:'2.5rem',fontSize:14,width:'100%',backgroundColor:'hsl(0,0%,100%)',borderColor:'black',borderRadius:6,color:'hsl(0,0%,21%)'}}
                    onChange={handleChange}
                    required={required}
                    readOnly={readOnly}
                    disabled={disabled}
                />):(
                <input
                className='border border-gray-300'
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    style={{minHeight:'2.5rem',fontSize:14,width:'calc( 100% - 10px )',paddingLeft:10,backgroundColor:'hsl(0,0%,100%)',borderColor:'black',borderRadius:6,color:'hsl(0,0%,21%)'}}
                    onChange={handleChange}
                    
                    readOnly={readOnly}
                    disabled={disabled}
                />)
            }
        </div>
        <p style={{color:'red'}}>{error}</p>

    </div>
  )
}

export default FormInput