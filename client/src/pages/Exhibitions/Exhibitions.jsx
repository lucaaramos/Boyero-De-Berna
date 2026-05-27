import React, { useEffect, useState } from "react";

import "./index.css";

import { CardExpo } from "../../componets/Card/CardExpo";

import img from "../../assets/boyero.jpg";

import copa from "../../assets/copa.png";

import useUser from "../../componets/hook/UseUser";

import useExhibitions from "./useExhibitons";

import CreateEvent from "../FormsCreate/CreateExpo";

import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";

export default function Exhibitions() {
  const { user } = useUser();

  const [events, setEvents] = useState([]);

  const [loadingPdf, setLoadingPdf] = useState(null);

  const { updateEvent } = useExhibitions();

  const getData = async () => {
    try {
      const data = await updateEvent();

      setEvents(data);
    } catch (error) {
      console.error(
        "Error fetching events:",
        error
      );
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleExportPDF = async (eventId) => {
    try {
      setLoadingPdf(eventId);

      const response = await fetch(
        `${process.env.REACT_APP_URI_API}/participant/events/${eventId}`
      );

      const data = await response.json();

      const doc = new jsPDF();

      doc.setFontSize(18);

      doc.text(
        "Participantes de la exposición",
        14,
        20
      );

      const headers = [
        [
          "ID",
          "Nombre",
          "Sexo",
          "Raza",
          "Categoría",
          "Nacimiento",
          "Dueño",
          "Expositor",
        ],
      ];

      const tableData = data.map((participant) => [
        participant.id,
        participant.name,
        participant.sex,
        participant.race,
        participant.category_id,
        participant.date_birth,
        participant.name_owner,
        participant.expositor,
      ]);

      autoTable(doc, {
        startY: 30,
        head: headers,
        body: tableData,
        styles: {
          fontSize: 8,
        },
        headStyles: {
          fillColor: [139, 94, 60],
        },
      });

      doc.save("participantes_evento.pdf");
    } catch (error) {
      console.error(
        "Error exporting PDF:",
        error
      );

      alert(
        "Ocurrió un error al exportar el PDF"
      );
    } finally {
      setLoadingPdf(null);
    }
  };

  return (
    <div className="exhibitions-page">
      {/* HERO */}

      <section className="exhibitions-hero">
        <img
          src={img}
          className="hero-image"
          alt="Exposiciones Boyero de Berna"
        />

        <div className="hero-overlay">
          <div className="hero-content">
            <span className="hero-subtitle">
              Boyero de Berna Club Argentino
            </span>

            <h1>Exposiciones</h1>

            <p>
              Eventos nacionales e internacionales
              dedicados al desarrollo y promoción
              del Boyero de Berna
            </p>
          </div>
        </div>
      </section>

      {/* CREATE EVENT */}

      {user?.type === "admin" && (
        <section className="create-event-section">
          <CreateEvent getData={getData} />
        </section>
      )}

      {/* CUP SECTION */}

      <section className="cup-section">
        <div className="cup-card">
          <div className="cup-header">
            <h2>Calendario oficial</h2>

            <p>
              Consulta próximas exposiciones y
              actividades oficiales
            </p>
          </div>

          <div className="cup-image-container">
            <img
              src={copa}
              className="cup-image"
              alt="Calendario exposiciones"
            />
          </div>
        </div>
      </section>

      {/* EVENTS */}

      <section className="events-section">
        <div className="events-header">
          <span className="events-tag">
            Eventos
          </span>

          <h2>Calendario de exposiciones</h2>

          <p>
            Participa de exposiciones y encuentros
            especializados de la raza
          </p>
        </div>

        <div className="events-grid">
          {events?.length > 0 ? (
            events.map((event) => (
              <div
                className="event-card-wrapper"
                key={event.id}
              >
                <CardExpo
                  getData={getData}
                  day={event.date}
                  id={event.id}
                  image={event.image}
                  title={event.title}
                  place={event.place}
                  description={event.description}
                />

                {user?.type === "admin" && (
                  <button
                    className="export-button"
                    onClick={() =>
                      handleExportPDF(event.id)
                    }
                    disabled={
                      loadingPdf === event.id
                    }
                  >
                    {loadingPdf === event.id
                      ? "Generando PDF..."
                      : "Exportar participantes"}
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="empty-events">
              <h3>
                No hay exposiciones disponibles
              </h3>

              <p>
                Próximamente se publicarán nuevos
                eventos
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}