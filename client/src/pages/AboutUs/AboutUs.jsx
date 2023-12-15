import React from "react";
import "./index.css";
import img from "../../assets/boyero3.jpg";
export const AboutUs = () => {
  return (
    <div className="aboutDivBack">
      
      <img src={img} className='responsive-image' alt=""></img>
        <h1 className="h1">
        Nuestra Institución
        </h1>
      <div
        className="responseAbout"
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
          marginTop: 50,
        }}
      >
        <div className="containerImageAbout">
          <figure style={{ border: "4px #fff solid" }}>
            <img
              className="imageAbout"
              src="https://static.wixstatic.com/media/bae273_795f1dd7696448dbb04aa3471c46e88f.jpg/v1/fill/w_550,h_305,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/bae273_795f1dd7696448dbb04aa3471c46e88f.jpg"
              alt=""
            />
          </figure>
        </div>
        <div className="aboutData">
          <div style={{ padding: 10 }}>
            <h2 style={{ fontSize: 40 }}>Historia</h2>
            <p style={{ lineHeight: 1.5 }}>
              {" "}
              En el año 2006 un grupo de criadores y propietarios iniciaron el
              sueño para que la raza Boyero de Berna tuviera su club de raza. El
              primer paso, fue conformar la Asociación Civil denominada Boyero
              de Berna Club Argentino. Cumpliendo con los requisitos necesarios,
              fueron autorizados para ser “ El CLUB DEL BOYERO DE BERNA”, la
              única Asociación Civil y de entidad legal que representa a la raza
              en la Federación Cinológica (FCA)de toda la República Argentina.
            </p>
            <p style={{ lineHeight: 1.5 }}>
              Desde los comienzos, con gran entusiasmo y compromiso por la raza,
              dieron lugar a presentaciones formales sobre el desarrollo de
              actividades en todo el país, brindado cursos de formación y
              charlas informativas a cargo de reconocidos profesionales a
              nuestros socios, acerca de temas inherentes a la reproducción,
              crianza y salud de nuestra raza en especial. El objetivo siempre
              ha sido que nuestros socios puedan disfrutar del beneficio del
              acercamiento entre propietarios y criadores. Por ello, se ha
              desarrollado la labor de llevar a cabo Exposiciones Nacionales e
              Internacionales con propietarios y criadores de todo el país.
              También se logra en el año 2009 presentar el primer modelo de
              carro, para, al año siguiente, dar inicio a las prácticas de
              Drafting. (En el drafting se intensifica el lazo entre el guía y
              su Boyero de Berna para realizar tareas tales como trasladar
              carga, actividad realizada antiguamente en las granjas suizas).
              Actualmente, brindamos al socio nuestra atención personalizada, no
              solo en la oficina que se encuentran en la sede de FCA, sino
              también por vía virtual, teniendo en consideración a quienes
              residen en el interior del país y a todas aquellas personas del
              territorio argentino que deseen consultar y asesorase sobre
              nuestra raza.
            </p>
            <p style={{ lineHeight: 1.5 }}>
             <b>NUESTRA LABOR ESPECIFICA:</b> Fomentar la cría responsable. Estimular
              el mejoramiento de la raza, teniendo en cuenta el standard y
              pedrigree, mediante exposiciones, cursos de adiestramiento y
              trabajo, y todo acto conducente a aquel fin. Entablar los lazos de
              cooperación con todas las instituciones que persiguen idéntico
              propósito y así, organizar, actualizar y mantener los registros
              genealógicos y de salubridad de la raza.{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};