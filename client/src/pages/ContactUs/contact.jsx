import React, { useState } from "react";

import dog from "../../assets/boyero.jpg";

import "./index.css";

import { Members } from "../../componets/Members/Members.jsx";

import emailjs from "emailjs-com";

const SERVICE_ID = process.env.REACT_APP_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_TEMPLATE_ID;
const USER_ID = process.env.REACT_APP_USER_ID;

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

    if (!SERVICE_ID || !TEMPLATE_ID || !USER_ID) {
      alert(
        "Falta configurar EmailJS en variables de entorno."
      );

      return;
    }

    try {
      setLoading(true);

      const templateParams = {
        from_name: contact.name,

        reply_to: contact.email,

        message: contact.message,

        city: contact.city,

        phone: contact.numberPhone,

        user_name: contact.name,

        user_email: contact.email,

        user_message: contact.message,

        timestamp: new Date().toLocaleString(),
      };

      const response = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        USER_ID
      );

      console.log(
        "SUCCESS!",
        response.status,
        response.text
      );

      alert("Mensaje enviado con éxito");

      resetForm();
    } catch (error) {
      console.error(
        "FAILED...",
        error?.status,
        error?.text,
        error
      );

      alert(
        `Error al enviar (${error?.status || "sin código"}): ${
          error?.text ||
          "Revise configuración de EmailJS"
        }`
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