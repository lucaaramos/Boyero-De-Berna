import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./index.css"
import image from "./image/bg.png"
import useUser from '../hook/UseUser'
export const NavBarDest = () => {
    const {user} = useUser()
    const {isPhone,isLoggedIn,logout} = useUser()
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        if (!isPhone) {
          setIsScrolled(window.scrollY > 150);
        }
      };

      handleScroll();
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [isPhone]);

  return (
    <div id="nav" className={`navBar2 ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className='contain_nb_image'>
            <img src={image} alt="Logo Boyero de Berna Club Argentino" style={{width:"60px",borderRadius: "0 0 30px 30px"}} />
        </div>
        <div className={`contain_navigate ${isScrolled ? 'contain_navigate-scrolled' : ''}`}>
          <ul>
            <li><Link to="/" className='navigate'>Inicio</Link></li>
            <li><Link to='/aboutUs' className='navigate'>Sobre Nosotros</Link></li>
            <li><Link to='/exhibitions' className='navigate'>Exposiciones</Link></li>
            <li><Link to='/news' className='navigate'>Noticias</Link></li>
            <li><Link to='/gallery' className='navigate'>Fotos</Link></li>
            <li><Link to='/contact' className='navigate'>Contacto</Link></li>
            {/* <Link to='/sponsors'><li className='navigate'>Sponsors</li></Link> */}
            {
                  user?.type === "admin" ? 
            <li><Link to='/sponsors' className='navigate'>Sponsors</Link></li>
                  :<></>
              }
            <li><Link to='/contact' className='li_member'>Ser Miembro</Link></li>
            {!isLoggedIn ? (
              <li><Link to='/ingresar' className='navigate'>Iniciar Sesión</Link></li>
            ) : (
              <li>
                <button type="button" className='navigate nav-button-logout' onClick={logout}>
                  Cerrar Sesión
                </button>
              </li>
            )}
          </ul>
        </div>
            </div>
  )
}
