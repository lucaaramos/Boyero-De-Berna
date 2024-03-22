import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../../componets/Card/Card'
import { Members } from '../../componets/Members/Members.jsx'
import { Redes } from '../../componets/Redes/Redes'
import { infoCard } from './cards'
import Carrusel from '../../componets/Carrusel/Carrusel'
import "./index.css"
import { Events } from '../../componets/Events/Events'
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import useUser from '../../componets/hook/UseUser'
import { HomeDestop } from '../../componets/Home/HomeDestop'
import { HomeMobile } from '../../componets/Home/HomeMobile'

AOS.init();
export const Home = () => {
  const {isPhone} = useUser()
  return (
    <div className='fondoHome' >
    <strong id='inico'/>
    {
      !isPhone ? 
        <>
          <HomeDestop/>
        </>
        :
        <>
          <HomeMobile/>        
        </>
    }
        
        <div className='container'>
          <div className='container-list-card' style={{display:"flex",flexWrap:"wrap"}}>
            {
              infoCard.map((e,i) => <Card key={i} img={e.img}  path={e.path} descripcion={e.descripcion}/>)
            }
          </div>
      </div>
      <div style={{width:"100%", display:"flex", justifyContent:"center",marginBottom:40}}>
        <Link to="" className='sabermas'>Si quieres saber mas sobre el bienestar del animal pincha aqui!</Link>
      </div>
      {/* <div style={{minHeight:"70vh"}}>
        <h5 style={{display:"flex",justifyContent: "space-around"}}>Conoce nuestros sponsors/miembros</h5>
        <Members count={4}/>
      </div> */}
      <div className='events' style={{}}>
        <Events/>
      </div>
    </div>
  )
}
