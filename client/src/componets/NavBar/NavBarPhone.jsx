import React, { useEffect, useRef, useState } from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faBars,faXmark} from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom'
import useUser from '../hook/UseUser'
export const NavBarPhone = () => {
    const {isLoggedIn,logout} = useUser()
    const [menu, setMenu] = useState(false)
    const menuRef = useRef(null)
    useEffect(()=>{
        let handle = (e)=>{
            if(!menuRef?.current?.contains(e?.target)){
                setMenu(false)
            }
        }
        document.addEventListener("mousedown",handle)
        return()=>{
            document.removeEventListener("mousedown",handle)
        }
    })
    return (
        !menu? <>
            <div style={{position:"fixed", zIndex:9999,backgroundColor:"#B06440",width:"100%",height:"60px",display:"flex",justifyContent:'center',top:0,alignItems: "center"}}>
                
                <FontAwesomeIcon icon={faBars} style={{fontSize:30,position:"absolute",left:15,top:15}} onClick={()=>setMenu(!menu)}/>       
                <p style={{textAlign:"center",color:"white",marginTop:8}}>Boyero de Berna Club Argentino</p>
                
            </div>
        </>:<>
        {
            
            <div ref={menuRef} style={{position:"fixed",zIndex:99999,backgroundColor:"#B06440",height:"100vh",width:"50vw",left:0}}>
                <FontAwesomeIcon icon={faXmark} style={{fontSize:30,position:"absolute",left:10,top:5}} onClick={()=>setMenu(!menu)}/>       
                <div className='contain_navigate'>
                    <ul style={{display:"flex",flexDirection:"column",margin:"180px 0 0 50px",alignItems: "flex-start"}}>
                        <Link to="/" style={{color:" #c9c9c9"}} onClick={()=>setMenu(!menu)}><li>Inicio</li></Link>
                        <Link to='/aboutUs' style={{color:" #c9c9c9",marginTop:"10px"}} onClick={()=>setMenu(!menu)} ><li>Sobre Nosotros</li></Link>  
                        <Link to='/news' style={{color:" #c9c9c9",marginTop:"10px"}} onClick={()=>setMenu(!menu)}><li>Noticias</li></Link>
                        <Link to='/exhibitions' style={{color:" #c9c9c9",marginTop:"10px"}} onClick={()=>setMenu(!menu)}><li>Exposiciones</li></Link>
                        <Link to='/gallery' style={{color:" #c9c9c9",marginTop:"10px"}} onClick={()=>setMenu(!menu)}><li>Fotos</li></Link>
                        <Link to='/contact' style={{color:" #c9c9c9",marginTop:"10px"}} onClick={()=>setMenu(!menu)}><li>Contacto</li></Link>
                        <Link to='/sponsors' style={{color:" #c9c9c9",marginTop:"10px"}} onClick={()=>setMenu(!menu)}><li>Sponsors</li></Link>
                        <Link to='/contact' style={{color:" #c9c9c9",marginTop:"10px"}} onClick={()=>setMenu(!menu)}><li>Ser Miembro</li></Link>

                        {!isLoggedIn ? 
                            <Link to='/ingresar' style={{color:" #c9c9c9",marginTop:"10px"}} onClick={()=>setMenu(!menu)}><li className=''>Iniciar Sesión</li></Link> 
                        :
                            <Link to='/' onClick={()=>setMenu(!menu)} style={{color:" #c9c9c9",marginTop:"10px"}}><li className='li_member' onClick={logout}>Cerrar Sesión</li></Link>
                        }
                    </ul>
                </div>
            </div>
        }</>
  )
}
