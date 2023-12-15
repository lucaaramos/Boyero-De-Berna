import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./index.css"
import image from "./image/bg.png"
import useUser from '../hook/UseUser'
export const NavBarDest = () => {
    const {user} = useUser()
    const {isPhone,isLoggedIn,logout} = useUser()
      window.addEventListener('scroll', function() {
      const navbar = document.querySelector('.navBar2');
      const navbar2 = document.querySelector('.contain_navigate');
      if(!isPhone){
      if(window.scrollY > 150) {
        navbar.classList.add('navbar-scrolled');
        navbar2.classList.add('contain_navigate-scrolled');
      } else {
        navbar2.classList.remove('contain_navigate-scrolled');
        navbar.classList.remove('navbar-scrolled');
      }}
    });

  return (
    <div id="nav" className='navBar2'>
        <div className='contain_nb_image'>
            <img src={image} style={{width:"60px",borderRadius: "0 0 30px 30px"}} />
        </div>
        <div className='contain_navigate'>
          <ul>
          <Link to="/" className='navigate'><li>Inicio</li></Link>
          <Link to='/aboutUs' className='navigate'><li>Sobre Nosotros</li></Link>  
            <Link to='/exhibitions' className='navigate'><li>Exposiciones</li></Link>
            <Link to='/news' className='navigate'><li> Noticias</li></Link>
            <Link to='/gallery' className='navigate'><li></li>Fotos</Link>
            <Link to='/contact' className='navigate'><li>Contacto</li></Link>
            {/* <Link to='/sponsors'><li className='navigate'>Sponsors</li></Link> */}
            {
                  user?.type === "admin" ? 
            <Link to='/sponsors' className='navigate'><li>Sponsors</li></Link>
                  :<></>
              }
            <Link to='/contact'><li className='li_member'>Ser Miembro</li></Link>
            {!isLoggedIn ? <Link to='/ingresar'><li className='navigate'>Iniciar Sesión</li></Link> : <span className='navigate' onClick={logout}>Cerrar Sesión</span>}
          </ul>
        </div>
            </div>
  )
}
