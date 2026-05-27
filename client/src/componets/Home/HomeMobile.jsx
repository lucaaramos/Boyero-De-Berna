// HomeMobile.jsx

import React from "react";

import "./style.css";

import img from "../NavBar/image/bg.png";

import { Link } from "react-router-dom";

export const HomeMobile = () => {
  return (
    <section className="mobile-hero">
      <div className="mobile-overlay">
        <div className="mobile-logo-container">
          <img
            src={img}
            alt="Boyero de Berna Club Argentino"
            className="mobile-logo"
          />
        </div>

        <span className="mobile-tag">
          Boyero de Berna Club Argentino
        </span>

        <h1>
          Comunidad dedicada al Boyero de Berna
        </h1>

        <p>
          Exposiciones, noticias, formación y
          bienestar de la raza en Argentina.
        </p>

        <Link
          to="/contact"
          className="mobile-button"
        >
          Quiero ser miembro
        </Link>
      </div>
    </section>
  );
};