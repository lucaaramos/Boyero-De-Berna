import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faInstagram,faFacebook} from "@fortawesome/free-brands-svg-icons"
import {faEnvelope} from "@fortawesome/free-solid-svg-icons"
import "./index.css"
export const Redes = () => {
  return (
    <div style={{width:200,display:"flex",justifyContent:"space-around",borderRadius:"10px",marginTop:50}}>
        <a className='contact' href='https://www.instagram.com/boyerodebernaclub/'  target="_blank" style={{textDecoration:"none",cursor:"pointer"}}><FontAwesomeIcon icon={faInstagram} style={{fontSize:30,margin:10}}/></a>
        <a className='contact' style={{textDecoration:"none",cursor:"pointer"}}><FontAwesomeIcon icon={faFacebook} style={{fontSize:30,margin:10}}/></a>
        <a className='contact' style={{textDecoration:"none",cursor:"pointer"}}><FontAwesomeIcon icon={faEnvelope} style={{fontSize:30,margin:10}}/></a>
    </div>
  )
}
