import React,{ReactNode,MouseEventHandler} from 'react'

const FormButton = ({
    icon=undefined,
    children,
    type='button',
    disabled,
    onClick,

}:{
    icon?:ReactNode;
    children?:ReactNode;
    type?:'button'|'submit' |'reset';
    disabled:boolean;
    onClick?:Function;
}

) => {
    const handleClick = (e:any) =>{
        onClick && onClick(e)
    }
    
  return (
    <button  onClick={handleClick} type={type} disabled={disabled} style={{color:'red',borderColor:'red',backgroundColor:'transparent',padding:'0em 2em',cursor:'pointer',justifyContent:'center',textAlign:'center',whiteSpace:'nowrap',height:'2.5rem',fontSize:'1rem',display:'inline-flex',border:'1px solid currentColor',borderRadius:6,verticalAlign:'top',position:'relative',alignItems:'center'}}>
        {children || null}
        {icon && (
            <span style={{}}>{icon}</span>
        )}
    </button>
  )
}

export default FormButton