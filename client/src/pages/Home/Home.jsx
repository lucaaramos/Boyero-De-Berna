// Home.jsx

import React from "react";

import { Link } from "react-router-dom";

import "./index.css";

import Card from "../../componets/Card/Card";

import { infoCard } from "./cards";

import { Events } from "../../componets/Events/Events";

import useUser from "../../componets/hook/UseUser";

import { HomeDestop } from "../../componets/Home/HomeDestop";

import { HomeMobile } from "../../componets/Home/HomeMobile";

import AOS from "aos";

import "aos/dist/aos.css";

AOS.init();

export const Home = () => {
  const { isPhone } = useUser();

  return (
    <div className="home-page">
      {/* HERO */}

      {!isPhone ? (
        <HomeDestop />
      ) : (
        <HomeMobile />
      )}

      {/* FEATURES */}

      <section className="cards-section">
        <div className="section-header">
          <span className="section-tag">
            Boyero de Berna Club Argentino
          </span>

          <h2>
            Descubre todo sobre nuestra comunidad
          </h2>

          <p>
            Información sobre exposiciones,
            noticias, miembros y actividades
            relacionadas al Boyero de Berna
          </p>
        </div>

        <div className="cards-grid">
          {infoCard.map((item, index) => (
            <Card
              key={index}
              img={item.img}
              path={item.path}
              descripcion={item.descripcion}
            />
          ))}
        </div>
      </section>

      {/* CTA */}

      <section className="cta-section">
        <div className="cta-card">
          <div className="cta-content">
            <span className="cta-tag">
              Bienestar animal
            </span>

            <h2>
              Aprende más sobre el cuidado y
              bienestar del Boyero de Berna
            </h2>

            <p>
              Consejos, información y recursos
              útiles para propietarios y amantes
              de la raza.
            </p>

            <Link
              to="/aboutUs"
              className="cta-button"
            >
              Saber más
            </Link>
          </div>
        </div>
      </section>

      {/* EVENTS */}

      <section className="events-section-home">
        <div className="events-header-home">
          <span className="section-tag">
            Próximos eventos
          </span>

          <h2>Eventos y exposiciones</h2>

          <p>
            Mantente informado sobre nuestras
            próximas actividades y encuentros
          </p>
        </div>

        <div className="events-container-home">
          <Events />
        </div>
      </section>
    </div>
  );
};