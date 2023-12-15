import React, { useState } from 'react';
import axios from 'axios';
import useUser from '../../../componets/hook/UseUser';
import { useNewsContext } from '../../../contexts/NewsContext';
import { useNavigate } from 'react-router-dom';
import './index.css'
export default function CreateNews() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('')
  const [image3, setImage3] = useState("");
  const { jwt } = useUser();
  const { dispatch } = useNewsContext();

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
      setTimeout(() => {
        axios(config)
            .then((e) => {
                console.log(e.data.id)
                if (image) {
                    const config2 = {
                        method: "post",
                        baseURL: `${process.env.REACT_APP_URI_API}/image/news/${e.data.id}`,
                        headers: { token: jwt },
                        data: formData,
                    };
                    axios(config2)
                        .then((e) => {
                            alert("evento creado con exito")
                            navigate("/news")
                        })
                        .catch((error) => {
                            console.log(
                                "Error en la petición para actualizar la imagen:",
                                error
                            );
                        });
                }
            })
            .catch((error) => {
                console.log(
                    "Error en la petición para actualizar información del usuario:",
                    error
                );
            });
    }, 1000);
  
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
