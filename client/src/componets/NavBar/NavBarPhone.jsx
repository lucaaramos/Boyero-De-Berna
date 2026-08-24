import React, { useEffect, useState } from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faBars,faXmark} from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom'
import useUser from '../hook/UseUser'
export const NavBarPhone = () => {
    const {isLoggedIn,logout, user} = useUser()
    const [menu, setMenu] = useState(false)

    useEffect(() => {
      const handleEscape = (e) => {
        if (e.key === "Escape") setMenu(false);
      };

      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, []);

    useEffect(() => {
      document.body.style.overflow = menu ? "hidden" : "";
      return () => {
        document.body.style.overflow = "";
      };
    }, [menu]);

    const closeMenu = () => setMenu(false);

    return (
        !menu? <>
            <div className="nav-phone-topbar">
                <button
                  type="button"
                  className="nav-phone-icon-button"
                  aria-label="Abrir menú de navegación"
                  aria-expanded={menu}
                  aria-controls="mobile-navigation"
                  onClick={() => setMenu(true)}
                >
                  <FontAwesomeIcon icon={faBars} />
                </button>
                <p className="nav-phone-title">Boyero de Berna Club Argentino</p>
            </div>
        </>:<>
        {
            <div className="nav-phone-overlay" onClick={closeMenu}>
              <div id="mobile-navigation" className="nav-phone-drawer" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  className="nav-phone-icon-button nav-phone-close"
                  aria-label="Cerrar menú de navegación"
                  onClick={closeMenu}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
                <div className='contain_navigate nav-phone-navigate'>
                    <ul className="nav-phone-list">
                        <li><Link to="/" className='navigate nav-phone-link' onClick={closeMenu}>Inicio</Link></li>
                        <li><Link to='/aboutUs' className='navigate nav-phone-link' onClick={closeMenu}>Sobre Nosotros</Link></li>
                        <li><Link to='/news' className='navigate nav-phone-link' onClick={closeMenu}>Noticias</Link></li>
                        <li><Link to='/exhibitions' className='navigate nav-phone-link' onClick={closeMenu}>Exposiciones</Link></li>
                        <li><Link to='/gallery' className='navigate nav-phone-link' onClick={closeMenu}>Fotos</Link></li>
                        <li><Link to='/contact' className='navigate nav-phone-link' onClick={closeMenu}>Contacto</Link></li>
                        {user?.type === "admin" ? (
                          <li><Link to='/sponsors' className='navigate nav-phone-link' onClick={closeMenu}>Sponsors</Link></li>
                        ) : null}
                        <li><Link to='/contact' className='li_member nav-phone-member' onClick={closeMenu}>Ser Miembro</Link></li>
                        {!isLoggedIn ? 
                            <li><Link to='/ingresar' className='navigate nav-phone-link' onClick={closeMenu}>Iniciar Sesión</Link></li>
                        :
                            <li>
                              <button
                                type="button"
                                className='li_member nav-phone-member nav-phone-logout'
                                onClick={() => {
                                  logout();
                                  closeMenu();
                                }}
                              >
                                Cerrar Sesión
                              </button>
                            </li>
                        }
                    </ul>
                </div>
            </div>
          </div>
        }</>
  )
}
