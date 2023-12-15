import React from 'react'


export  function CardNew({img, descripcion}) {
  return (
    <div style={{width:500, height:500, margin:"0 10px", alignItems: "center"}}>
        <img style={{objectFit:"contain",width:300,height:400}} src={img} alt=''/>
        <h5>{descripcion}</h5>
    </div>
  )
}