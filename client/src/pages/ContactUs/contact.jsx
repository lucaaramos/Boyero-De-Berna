import React, { useState } from "react";
import axios from "axios";

import dog from "../../assets/boyero.jpg";

import "./index.css";

import { Members } from "../../componets/Members/Members.jsx";

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: "",
    city: "",
    numberPhone: "",
  });

  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setContact({
      name: "",
      email: "",
      message: "",
      city: "",
      numberPhone: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post(
        `${process.env.REACT_APP_URI_API}/contact`,
        contact
      );

      alert("Mensaje enviado con éxito");

      resetForm();
    } catch (error) {
      console.error("FAILED...", error);

      alert(
        error?.response?.data?.error ||
          "Error al enviar el mensaje. Intenta nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      {/* HERO */}

      <section
        className="contact-hero"
        style={{
          backgroundImage: `url(${dog})`,
        }}
      >
        <div className="contact-overlay">
          <div className="contact-hero-content">
            <h1>Contacto</h1>

            <p>
              Comunícate con nosotros para consultas,
              exposiciones o información sobre el Boyero de
              Berna
            </p>
          </div>
        </div>
      </section>

      {/* FORM */}

      <section className="contact-section">
        <div className="contact-card">
          <div className="contact-header">
            <h2>Envíanos un mensaje</h2>

            <p>
              Completa el formulario y responderemos a la
              brevedad
            </p>
          </div>

          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >
            {/* ROW */}

            <div className="form-row">
              <div className="form-group">
                <label>Nombre y apellido</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Nombre completo"
                  value={contact.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Teléfono</label>

                <input
                  type="text"
                  name="numberPhone"
                  placeholder="Número de teléfono"
                  value={contact.numberPhone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* ROW */}

            <div className="form-row">
              <div className="form-group">
                <label>Ciudad</label>

                <input
                  type="text"
                  name="city"
                  placeholder="Ciudad"
                  value={contact.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                  value={contact.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* MESSAGE */}

            <div className="form-group">
              <label>Mensaje</label>

              <textarea
                name="message"
                placeholder="Escribe tu mensaje..."
                value={contact.message}
                onChange={handleChange}
                rows="7"
                required
              />
            </div>

            {/* BUTTON */}

            <div className="button-container">
              <button
                type="submit"
                className="submit-button"
                disabled={loading}
              >
                {loading
                  ? "Enviando..."
                  : "Enviar mensaje"}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* MEMBERS */}

      <section className="members-section">
        <div className="members-container">
          <Members count={4} />
        </div>
      </section>
    </div>
  );
}