import React from "react";
import { Link, useParams } from "react-router-dom";

import { useNewsContext } from "../../contexts/NewsContext";

import "./newsDetail.css";

import fallbackImg from "../../assets/boyero.jpg";

export default function NewsDetail() {
  const { id } = useParams();

  const { state } = useNewsContext();

  const { news } = state;

  const noticia = news.find((n) => String(n.id) === String(id));

  const getNewsImageSrc = (imagePath) => {
    if (
      !imagePath ||
      imagePath === "undefined" ||
      imagePath === "null"
    ) {
      return fallbackImg;
    }

    if (/^https?:\/\//i.test(imagePath)) {
      return imagePath;
    }

    return `${process.env.REACT_APP_URI_API}${imagePath}`;
  };

  if (!noticia) {
    return (
      <div className="news-detail-not-found">
        <h2>Noticia no encontrada</h2>

        <Link to="/news" className="back-button">
          Volver a noticias
        </Link>
      </div>
    );
  }

  return (
    <div className="news-detail-page">
      {/* HERO */}

      <section className="detail-hero">
        <img
          src={getNewsImageSrc(noticia.image)}
          alt={noticia.title}
          className="detail-hero-image"
          onError={(e) => {
            e.currentTarget.src = fallbackImg;
          }}
        />

        <div className="detail-overlay">
          <div className="detail-overlay-content">
            <span className="detail-author">
              Por {noticia.user?.name || "Administrador"}
            </span>

            <h1 className="detail-title">
              {noticia.title}
            </h1>
          </div>
        </div>
      </section>

      {/* CONTENT */}

      <section className="detail-content-section">
        <div className="detail-content-card">
          <p className="detail-content">
            {noticia.content}
          </p>

          <div className="detail-buttons">
            <Link to="/news" className="back-button">
              ← Volver a noticias
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}