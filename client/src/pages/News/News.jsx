// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useNewsContext } from '../../contexts/NewsContext';
// import './index.css';
// import img from '../../assets/boyero.jpg';
// import CreateNews from '../FormsCreate/CreateNews/index';
// import UpdateNews from '../News/updateNews';
// import Delete from '../../componets/hook/deleteNews';
// import useUser from '../../componets/hook/UseUser';
// // import '../Exhibitions/index.css'

// export default function NewsList() {
//   const {user} = useUser()
//   const { state, dispatch } = useNewsContext();
//   const { news } = state;
//   const { DeleteNew } = Delete();

//   const handleDelete = async (noticiaId) => {
//     const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta noticia?');
//     if (confirmDelete) {
//       await DeleteNew(noticiaId);
//       window.location.reload();
//     }
//   };

//   const getNewsImageSrc = (imagePath) => {
//     if (!imagePath || imagePath === "undefined" || imagePath === "null") return img;
//     if (/^https?:\/\//i.test(imagePath)) return imagePath;
//     return `${process.env.REACT_APP_URI_API}${imagePath}`;
//   };

//   return (
//     <div className="aboutDivBack">
//       <img src={img}  className='responsive-image' alt="">
//       </img>
//         <h1 className='title-news'>Noticias</h1>
//       {
//           user?.type === "admin" ? <CreateNews />:<></>
//         }
//       <div className="expo">
//         <div className='containerr'>
//           {news.map((noticia) => (
//             <div className='news'  key={noticia.id}>
//               <h3 className="newsTitle">{noticia.title}</h3>
//               <p className="newsContent">{noticia.content}</p>
//               <p className="newsAuthor">Por: {noticia.user.name}</p>
//               <img
//                 className='img'
//                 src={getNewsImageSrc(noticia.image)}
//                 alt={noticia.title || "Noticia"}
//                 onError={(e) => { e.currentTarget.src = img; }}
//               />
//               {/* C:\Users\lucav\OneDrive\Desktop\deploy\Boyero-De-Berna\app2\optimize\large-1697558057705.jpg */}
              
//               <div className='divButtons'>
//               {
//                   user?.type === "admin" ? <button className='button' onClick={() => handleDelete(noticia.id)}>X</button> :<></>
//               }
//               {
//                   user?.type === "admin" ? <Link to={`/update-news/${noticia.id}`} className="toggle-archive-button">
//                 Actualizar Noticia
//               </Link> :<></>
//               }
//               </div>
//             </div>
//           ))}
//         </div>
        
//       </div>
//     </div>
//   );
// }

import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { useNewsContext } from "../../contexts/NewsContext";

import "./index.css";

import img from "../../assets/boyero.jpg";

import CreateNews from "../FormsCreate/CreateNews/index";

import Delete from "../../componets/hook/deleteNews";
import useUser from "../../componets/hook/UseUser";
import NewsDetail from "./NewsDetail";

export default function NewsList() {
  const { user } = useUser();

  const { state, dispatch } = useNewsContext();

  const { news } = state;

  const { DeleteNew } = Delete();

  const [search, setSearch] = useState("");

  const handleDelete = async (noticiaId) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar esta noticia?"
    );

    if (!confirmDelete) return;

    try {
      await DeleteNew(noticiaId);

      dispatch({
        type: "DELETE_NEWS",
        payload: noticiaId,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getNewsImageSrc = (imagePath) => {
    if (
      !imagePath ||
      imagePath === "undefined" ||
      imagePath === "null"
    ) {
      return img;
    }

    if (/^https?:\/\//i.test(imagePath)) {
      return imagePath;
    }

    return `${process.env.REACT_APP_URI_API}${imagePath}`;
  };

  const filteredNews = useMemo(() => {
    return news.filter((noticia) => {
      return (
        noticia.title
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        noticia.content
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    });
  }, [news, search]);

  return (
    <div className="news-page">
      {/* HERO */}

      <section className="news-hero">
        <img
          src={img}
          className="news-hero-image"
          alt="Boyero de Berna"
        />

        <div className="news-hero-overlay">
          <div className="news-hero-content">
            <h1 className="news-title">Noticias</h1>

            <p className="news-subtitle">
              Novedades, exposiciones y actualidad del mundo del
              Boyero de Berna
            </p>
          </div>
        </div>
      </section>

      {/* TOP BAR */}

      <section className="news-topbar">
        <input
          type="text"
          placeholder="Buscar noticias..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {user?.type === "admin" && (
          <div className="create-news-wrapper">
            <CreateNews />
          </div>
        )}
      </section>

      {/* NEWS */}

      <section className="news-section">
        {filteredNews?.length > 0 ? (
          <div className="news-grid">
            {filteredNews.map((noticia) => (
              <article className="news-card" key={noticia.id}>
                {/* IMAGE */}

                <div className="news-image-container">
                  <img
                    className="news-image"
                    src={getNewsImageSrc(noticia.image)}
                    alt={noticia.title || "Noticia"}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = img;
                    }}
                  />

                  {user?.type === "admin" && (
                    <div className="admin-overlay">
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(noticia.id)}
                      >
                        Eliminar
                      </button>

                      <Link
                        to={`/update-news/${noticia.id}`}
                        className="edit-button"
                      >
                        Editar
                      </Link>
                    </div>
                  )}
                </div>

                {/* CONTENT */}

                <div className="news-content-wrapper">
                  <span className="news-author">
                    Por {noticia.user?.name || "Administrador"}
                  </span>

                  <h2 className="news-card-title">
                    {noticia.title}
                  </h2>

                  <p className="news-card-content">
                    {noticia.content?.length > 180
                      ? `${noticia.content.slice(0, 180)}...`
                      : noticia.content}
                  </p>

                  <Link
                    to={`/news/${noticia.id}`}
                    className="read-more-button"
                  >
                    Leer más
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-news">
            <h2>No se encontraron noticias</h2>

            <p>
              Intenta realizar otra búsqueda o vuelve más tarde.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}