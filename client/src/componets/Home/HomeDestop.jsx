// HomeDestop.jsx

import React from "react";

import Carrusel from "../Carrusel/Carrusel";

import { Redes } from "../Redes/Redes";

import "./desktop.css";

export const HomeDestop = () => {
  return (
    <section className="desktop-hero">
      {/* CAROUSEL */}

      <div className="desktop-carousel">
        <Carrusel />
      </div>

      {/* OVERLAY */}

      <div className="desktop-overlay">
        <div className="desktop-content">
          <span
            className="desktop-tag"
            data-aos="fade-right"
            data-aos-duration="1200"
          >
            Boyero de Berna Club Argentino
          </span>

          <h1
            data-aos="fade-left"
            data-aos-duration="1400"
          >
            Pasión y compromiso por la raza
          </h1>

          <p
            data-aos="fade-up"
            data-aos-duration="1600"
          >
            Desde hace años trabajamos
            constantemente en el mantenimiento,
            desarrollo y bienestar del Boyero de
            Berna en Argentina, compartiendo
            conocimientos y promoviendo la cría
            responsable.
          </p>

          <div
            className="desktop-redes"
            data-aos="zoom-in"
            data-aos-duration="1800"
          >
            <Redes />
          </div>
        </div>
      </div>
    </section>
  );
};