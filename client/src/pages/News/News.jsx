import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNewsContext } from '../../contexts/NewsContext';
import './index.css';
import img from '../../assets/boyero.jpg';
import CreateNews from '../FormsCreate/CreateNews/index';
import UpdateNews from '../News/updateNews';
import Delete from '../../componets/hook/deleteNews';
import useUser from '../../componets/hook/UseUser';
import '../Exhibitions/index.css'

export default function NewsList() {
  const {user} = useUser()
  const { state, dispatch } = useNewsContext();
  const { news } = state;
  const { DeleteNew } = Delete();

  const handleDelete = async (noticiaId) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta noticia?');
    if (confirmDelete) {
      await DeleteNew(noticiaId);
      window.location.reload();
    }
  };

  return (
    <div className="aboutDivBack">
      <img src={img}  className='responsive-image' alt="">
      </img>
        <h1 className='title-news'>Noticias</h1>
      {
          user?.type === "admin" ? <CreateNews />:<></>
        }
      <div className="expo">
        <div className='containerr'>
          {news.map((noticia) => (
            <div className='news'  key={noticia.id}>
              <h3 className="newsTitle">{noticia.title}</h3>
              <p className="newsContent">{noticia.content}</p>
              <p className="newsAuthor">Por: {noticia.user.name}</p>
              <img className='img' src={`${process.env.REACT_APP_URI_API}${noticia.image}/optimize`} />
              {/* C:\Users\lucav\OneDrive\Desktop\deploy\Boyero-De-Berna\app2\optimize\large-1697558057705.jpg */}
              
              <div className='divButtons'>
              {
                  user?.type === "admin" ? <button className='button' onClick={() => handleDelete(noticia.id)}>X</button> :<></>
              }
              {
                  user?.type === "admin" ? <Link to={`/update-news/${noticia.id}`} className="toggle-archive-button">
                Actualizar Noticia
              </Link> :<></>
              }
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}
