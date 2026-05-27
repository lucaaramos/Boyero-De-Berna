import axios from "axios";
import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import useUser from "../../componets/hook/UseUser";

import "./update.css";

import fallbackImg from "../../assets/boyero.jpg";

export default function UpdateNews() {
  const navigate = useNavigate();

  const { id } = useParams();

  const { jwt } = useUser();

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [image, setImage] = useState(null);

  const [previewImage, setPreviewImage] = useState("");

  const [form, setForm] = useState({
    title: "",
    content: "",
    image: "",
  });

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);

        const response = await axios({
          method: "get",
          baseURL: `${process.env.REACT_APP_URI_API}/news/${id}`,
          headers: {
            token: jwt,
          },
        });

        setForm({
          title: response.data.title || "",
          content: response.data.content || "",
          image: response.data.image || "",
        });
      } catch (error) {
        console.error(error);
        alert("Ocurrió un error al cargar la noticia");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id, jwt]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event?.target?.files[0];

    if (!file) return;

    setImage(file);

    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);

      await axios({
        method: "put",
        baseURL: `${process.env.REACT_APP_URI_API}/news/${id}`,
        headers: {
          token: jwt,
        },
        data: {
          title: form.title,
          content: form.content,
        },
      });

      if (image) {
        const formData = new FormData();

        formData.append("image", image);

        await axios({
          method: "post",
          baseURL: `${process.env.REACT_APP_URI_API}/image/news/${id}`,
          headers: {
            token: jwt,
          },
          data: formData,
        });
      }

      alert("Noticia actualizada con éxito");

      navigate("/news");
    } catch (error) {
      console.error(
        "Error actualizando noticia:",
        error
      );

      alert("Ocurrió un error al actualizar la noticia");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="update-news-page">
      {/* HERO */}

      <section className="update-news-hero">
        <div className="update-news-overlay">
          <div className="update-news-hero-content">
            <h1>Editar noticia</h1>

            <p>
              Modifica la información y la imagen de la noticia
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}

      <section className="update-news-section">
        <div className="update-news-card">
          {loading ? (
            <div className="loading-container">
              <p>Cargando noticia...</p>
            </div>
          ) : (
            <form
              className="update-news-form"
              onSubmit={handleSubmit}
            >
              {/* TITLE */}

              <div className="form-group">
                <label>Título</label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleInputChange}
                  placeholder="Título de la noticia"
                  required
                />
              </div>

              {/* CONTENT */}

              <div className="form-group">
                <label>Contenido</label>

                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleInputChange}
                  placeholder="Contenido de la noticia"
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

              {(previewImage || form.image) && (
                <div className="image-preview-container">
                  <img
                    src={
                      previewImage
                        ? previewImage
                        : `${process.env.REACT_APP_URI_API}${form.image}`
                    }
                    alt="Preview noticia"
                    className="preview-image"
                    onError={(e) => {
                      e.currentTarget.src = fallbackImg;
                    }}
                  />
                </div>
              )}

              {/* BUTTONS */}

              <div className="buttons-container">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => navigate("/news")}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="save-button"
                  disabled={saving}
                >
                  {saving
                    ? "Guardando..."
                    : "Guardar cambios"}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}