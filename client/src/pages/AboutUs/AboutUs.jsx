import React from "react";

import "./index.css";

import img from "../../assets/boyero3.jpg";

export const AboutUs = () => {
  return (
    <div className="about-page">
      {/* HERO */}

      <section className="about-hero">
        <img
          src={img}
          className="about-hero-image"
          alt="Boyero de Berna"
        />

        <div className="about-overlay">
          <div className="about-overlay-content">
            <span className="about-subtitle">
              Boyero de Berna Club Argentino
            </span>

            <h1>Nuestra Institución</h1>

            <p>
              Comprometidos con la preservación,
              difusión y desarrollo responsable del
              Boyero de Berna en Argentina
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}

      <section className="about-section">
        <div className="about-container">
          {/* IMAGE */}

          <div className="about-image-container">
            <figure className="about-figure">
              <img
                className="about-image"
                src="https://static.wixstatic.com/media/bae273_795f1dd7696448dbb04aa3471c46e88f.jpg/v1/fill/w_550,h_305,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/bae273_795f1dd7696448dbb04aa3471c46e88f.jpg"
                alt="Boyero de Berna Club Argentino"
              />
            </figure>
          </div>

          {/* TEXT */}

          <div className="about-content">
            <div className="about-card">
              <span className="about-tag">
                Nuestra historia
              </span>

              <h2>
                Más de una década promoviendo la
                raza
              </h2>

              <p>
                En el año 2006 un grupo de criadores
                y propietarios iniciaron el sueño
                para que la raza Boyero de Berna
                tuviera su propio club de raza.
              </p>

              <p>
                El primer paso fue conformar la
                Asociación Civil denominada Boyero
                de Berna Club Argentino. Cumpliendo
                con los requisitos necesarios,
                fueron autorizados para ser “El Club
                del Boyero de Berna”, la única
                Asociación Civil y entidad legal que
                representa oficialmente a la raza en
                la Federación Cinológica Argentina
                (FCA).
              </p>

              <p>
                Desde sus comienzos, el club impulsó
                actividades en todo el país,
                brindando cursos de formación,
                charlas informativas y exposiciones
                nacionales e internacionales para
                propietarios y criadores.
              </p>

              <p>
                También se promovió el Drafting,
                actividad histórica de la raza que
                fortalece el vínculo entre el guía y
                su Boyero de Berna mediante tareas
                de carga y trabajo.
              </p>

              <div className="about-highlight">
                <h3>Nuestra labor específica</h3>

                <p>
                  Fomentar la cría responsable,
                  estimular el mejoramiento de la
                  raza y mantener registros
                  genealógicos y sanitarios,
                  promoviendo siempre el bienestar y
                  desarrollo del Boyero de Berna en
                  Argentina.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};