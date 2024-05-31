import React, { Children , ReactNode } from 'react'

const Card = ({children}:{children?:ReactNode;}) => {
    const childrenArray = Children.toArray(children) as any ;
    const header = childrenArray.find((child:any)=>child?.props?.slot === 'header');
    const body = childrenArray.find((child:any)=>child?.props?.slot === 'body');
    const footer = childrenArray.find((child:any)=>child?.props?.slot === 'footer');
  return (
    <div style={{backgroundColor:'white',borderRadius:6,boxShadow:'0 2px 3px rgba(0,0,0,0.1)',fontSize:'1em',overflowY:'auto',}}>
        {header && <header style={{alignItems:'center',display:'flex',justifyContent:'flex-start',padding:20,borderBottom:'1px solid #d8d8d8'}}>{header}</header>}
        {body && <div style={{padding:20}}>{body}</div>}
        {footer && <footer style={{alignItems:'center',display:'flex',justifyContent:'flex-end',padding:20,borderTop:'1px solid #d8d8d8'}}>{footer}</footer>}
         
    </div>
  )
}

export default Card