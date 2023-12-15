import React from 'react'
import carrusel1 from './../../assets/boyero.jpg'
import carrusel2 from './../../assets/boyero2.jfif'
import carrusel3 from './../../assets/boyero3.jpg'
import '../Carrusel/carrusel.css'

export default function Carrusel() {
  return (
    <div>
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true" style={{background: 'linear-gradient(270deg, #000 34%,rgba(0 , 0, 0, .6)35%)'}}>
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" >
            <img src={carrusel1} className="d-block w-100" style={{height: '100vh',objectFit:'cover'}} alt="..." />
          </div>
          <div className="carousel-item">
            <img src={carrusel2} className="d-block w-100" style={{height: '100vh',objectFit:'cover'}} alt="..." />
          </div>
          <div className="carousel-item">
            <img src={carrusel3} className="d-block w-100" style={{height: '100vh',objectFit:'cover'}} alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  )
}
