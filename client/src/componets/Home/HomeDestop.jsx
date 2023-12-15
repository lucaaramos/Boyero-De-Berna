import React from "react";
import Carrusel from "../Carrusel/Carrusel";
import { Redes } from "../Redes/Redes";

export const HomeDestop = () => {
  return (
    <div>
      <div className="imagen-zoom">
        <Carrusel />
      </div>
      <div
        className="gradient"
        style={{ position: "absolute", width: "34%", zIndex: 100, right: 1 }}
      >
        <h1
          style={{ color: "#c9c9c9" }}
          data-aos="slide-left"
          data-aos-duration="2000"
        >
          Boyero de Berna Club Argentino
        </h1>
        <p
          style={{ color: "#c9c9c9" }}
          data-aos="flip-left"
          data-aos-duration="2000"
        >
          El Club del Boyero de Berna en Argentina, desde hace años y en forma
          constante ha desarrollado su labor cotidiana e incesante dedicándose
          al mantenimiento y mejoramiento del estándar de la raza. Siendo
          expertos e idóneos competentes en el cuidado y atención del bienestar
          de los perros. Es desde el Club del Boyero de Berna en Argentina,
          donde se brinda y comparte la información académica teórica-practica
          en medicina veterinaria, a través del saber de profesionales
          destacados a nivel nacional e internacional (cursos, disertaciones,
          seminarios, charlas informativas, etc.) sobre la raza como así también
          la experiencia de años en cuidadores de la misma.
        </p>
        <div
          className="redes"
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Redes />
        </div>
      </div>
    </div>
  );
}