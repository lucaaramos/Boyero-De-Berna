import React from 'react'
import './index.css'
import { Link } from 'react-router-dom'
export default function Card({img,title,descripcion,path}) {
  const pathHTTP = path.includes("https")
  return (
    <div>
        <div className='contianer-card' style={{backgroundImage:`url(${img})`}}>
                <h4>{title}</h4>
            <section className='section-card'>
                <p> {descripcion}</p>
            {
              pathHTTP ?
              <a target="_blank" href={`${path}`} style={{cursor: "pointer",color:"#cacaca"}}>Click para saber más!</a>
              : <Link style={{cursor: "pointer",color:"#cacaca"}} to={path}>Click para saber más!</Link>
            }
              </section>
        </div>
    </div>
  )
}
