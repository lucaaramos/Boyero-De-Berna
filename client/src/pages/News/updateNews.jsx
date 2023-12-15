import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "../FormsCreate/CreateExpo/index.css"
import { useNavigate, useParams } from 'react-router-dom';
import useUser from '../../componets/hook/UseUser';
export default function UpdateNews() {
  const navigate = useNavigate();
  const {id} = useParams() 
  const [image, setImage] = useState("");
  const [image3, setImage3] = useState("");
  const { jwt} = useUser()
  const [form, setForm] = useState();
    useEffect(()=>{
        const config = {
            method: "get",
            baseURL: `${process.env.REACT_APP_URI_API}/news/${id}`,
            headers: { token: jwt },
            
        }
        axios(config).then(e=>{
          setForm({title : e.data.title 
            , content : e.data.content
          ,image: e.data.image})
          console.log(e.data)
        
        }).catch(e=>alert("ocurrio un error"))
    },[])

  

  console.log(setForm?.image)

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    setImage(event?.target?.files[0]);
    setImage3(URL.createObjectURL(event?.target?.files[0]));
};
const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append("image", image);
    const config = {
      method: "put",
      baseURL: `${process.env.REACT_APP_URI_API}/news/${id}`,
      headers:{token:jwt},
      data:{
        title : form.title,
        content : form.content,
      }
  };

    setTimeout(() => {
        axios(config)
            .then((e) => {
                if (image) {
                    const config2 = {
                        method: "post",
                        baseURL: `${process.env.REACT_APP_URI_API}/image/news/${id}`,
                        headers: { token: jwt },
                        data: formData,
                    };
                    axios(config2)
                        .then((e) => {
                            alert("noticia creada con exito")
                            window.location.replace('/news')
                        })
                        .catch((error) => {
                            console.log(
                                "Error en la petición para actualizar la imagen:",
                                error
                            );
                        });
                }
                else {
                    alert("noticia creada con exito")
                    navigate("/news")
                  window.location.reload();
                    
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
    <div className='divFormEvents'>
     <h3>Actualizar noticia</h3>
    <form onSubmit={(e)=>handleSubmit(e)} style={{marginTop:"90px"}}>
      <input
        type="text"
        name="title"
        value={form?.title}
        onChange={handleInputChange}
        placeholder="Titulo"
      />
      <input
        type="text"
        name="content"
        value={form?.content}
        onChange={handleInputChange}
        placeholder="Contenido"
      />
      <input 
      type="file" 
      onChange={(e) => handleFileChange(e)}
      />
      <button className='button'>Editar noticia</button>
    </form>  
    {
      (image3 || form) && <img src={image3 ? image3 : `${process.env.REACT_APP_URI_API}${form?.image}`}
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