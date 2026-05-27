import React, { useState } from "react";

import axios from "axios";

import useUser from "../../../componets/hook/UseUser";
import { useNewsContext } from "../../../contexts/NewsContext";

import "./index.css";

import fallbackImg from "../../../assets/boyero.jpg";

export default function CreateNews() {
  const { jwt } = useUser();

  const { dispatch } = useNewsContext();

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const [image, setImage] = useState(null);

  const [previewImage, setPreviewImage] = useState("");

  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setImage(null);
    setPreviewImage("");
  };

  const handleFileChange = (event) => {
    try {
      const file = event?.target?.files[0];

      if (!file) return;

      setImage(file);

      const imageUrl = URL.createObjectURL(file);

      setPreviewImage(imageUrl);
    } catch (error) {
      console.error(
        "Error al crear preview de imagen:",
        error
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios({
        method: "post",
        baseURL: `${process.env.REACT_APP_URI_API}/news`,
        headers: {
          token: jwt,
        },
        data: {
          title,
          content,
        },
      });

      if (image) {
        const formData = new FormData();

        formData.append("image", image);

        await axios({
          method: "post",
          baseURL: `${process.env.REACT_APP_URI_API}/image/news/${response.data.id}`,
          headers: {
            token: jwt,
          },
          data: formData,
        });
      }

      const updatedNews = await axios.get(
        `${process.env.REACT_APP_URI_API}/news/`
      );

      dispatch({
        type: "SET_NEWS",
        payload: updatedNews.data,
      });

      resetForm();

      alert("Noticia creada con éxito");
    } catch (error) {
      console.error(
        "Error creando noticia:",
        error
      );

      alert("Ocurrió un error al crear la noticia");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-news-wrapper">
      <div className="create-news-card">
        <div className="create-news-header">
          <h2>Crear noticia</h2>

          <p>
            Publica novedades y anuncios relacionados con el
            Boyero de Berna
          </p>
        </div>

        <form
          className="create-news-form"
          onSubmit={handleSubmit}
        >
          {/* TITLE */}

          <div className="form-group">
            <label>Título</label>

            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título de la noticia"
              required
            />
          </div>

          {/* CONTENT */}

          <div className="form-group">
            <label>Contenido</label>

            <textarea
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escribe el contenido de la noticia..."
              rows="10"
              required
            />
          </div>

          {/* IMAGE */}

          <div className="form-group">
            <label>Imagen</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          {/* PREVIEW */}

          {previewImage && (
            <div className="preview-container">
              <img
                src={previewImage}
                alt="Preview noticia"
                className="preview-image"
                onError={(e) => {
                  e.currentTarget.src = fallbackImg;
                }}
              />
            </div>
          )}

          {/* BUTTON */}

          <div className="button-container">
            <button
              type="submit"
              className="create-button"
              disabled={loading}
            >
              {loading
                ? "Publicando..."
                : "Publicar noticia"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}