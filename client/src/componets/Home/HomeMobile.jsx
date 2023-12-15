import React from 'react'
import "./style.css"
import img from "../NavBar/image/bg.png"
import { Link } from 'react-router-dom'
export const HomeMobile = () => {
  return (
    <div className='divHomeMobile' style={{display:"flex",justifyContent:'space-around',alignItems:"center", flexDirection:"column"}}>
      <div className="contenedor-circular">
        <img src={img} alt="" width={200}  style={{filter:"opacity(35%)"}}/>
      </div>
        <p style={{backgroundColor:"#B06440",padding:"3px",borderRadius:"10px"}}><Link to='/contact' style={{color:"black"}} >Click aqui para ser miebro!</Link></p>
    </div>
  )
}
