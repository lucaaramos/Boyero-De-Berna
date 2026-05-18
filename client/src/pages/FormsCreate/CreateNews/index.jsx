import React, { useState } from 'react';
import axios from 'axios';
import useUser from '../../../componets/hook/UseUser';
import { useNewsContext } from '../../../contexts/NewsContext';
import './index.css'
export default function CreateNews() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('')
  const [image3, setImage3] = useState("");
  const { jwt } = useUser();
  const { dispatch } = useNewsContext();

  const resetForm = () => {
    setTitle('');
    setContent('');
    setImage('');
    setImage3('');
  };

  const handleFileChange = (event) => {
      try {
        setImage(event?.target?.files[0]);
        const imageUrl = URL.createObjectURL(event?.target?.files[0]);
        setImage3(imageUrl);
      } catch (error) {
        console.error('Error al crear la URL del objeto:', error);
      }

};

  const handleSubmit = async (e) => {
      
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
      const config = {
        method: 'post',
        baseURL: `${process.env.REACT_APP_URI_API}/news`,
        headers: { token: jwt },
        data: {
          title,
          content,
          
        },
      };
      try {
        const response = await axios(config);
        if (image) {
          const config2 = {
            method: "post",
            baseURL: `${process.env.REACT_APP_URI_API}/image/news/${response.data.id}`,
            headers: { token: jwt },
            data: formData,
          };
          await axios(config2);
        }
        const updatedNews = await axios.get(`${process.env.REACT_APP_URI_API}/news/`);
        dispatch({ type: 'SET_NEWS', payload: updatedNews.data });
        resetForm();
        alert("evento creado con exito")
      } catch (error) {
        console.log(
          "Error en la petición para actualizar información del usuario:",
          error
        );
      }
  
  };
  
  return (
    <div className='divFormNews'>
      <h3>Crear Noticia</h3>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Título'
        />
        <textarea
          name='content'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder='Contenido'
        />
        <input
        type='file'
        onChange={(e) => handleFileChange(e)}>
        </input>
        <div className='divButton'>
        <button className='button'>Crear</button>
        </div>
      </form>
      {
      image3 && <img src={image3} alt='image_selected'
            style={{
                borderRadius: 10,
                display: "block",
                maxHeight: "auto",
                marginTop: 50,
                maxWidth: "350px",
            }}></img>
    }
    
    </div>
  );
}
