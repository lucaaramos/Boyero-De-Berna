import axios from 'axios';
import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import useUser from '../../../componets/hook/UseUser';
import "../CreateNews/index.css";


export default function CreateSponsors({getData}) {
  const [image, setImage] = useState("");
  const [image3, setImage3] = useState("");
  const { jwt } = useUser()
  
  const [form, setForm] = useState({
    name: "",
    content: "",
    webSite: "",
  });
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };
  
  const resetForm = ()=>{
    setForm({
      name: "",
      content: "",
      webSite: "",
    })
    setImage("")
    setImage3("")
  }

  const handleFileChange = (event) => {
    setImage(event?.target?.files[0]);
    setImage3(URL.createObjectURL(event?.target?.files[0]));
};

const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append("image", image);
    const config = {
        method: "post",
        baseURL: `${process.env.REACT_APP_URI_API}/sponsors/create`,
        headers: { token: jwt },
        data: {
            name:form.name,
            content: form.content,
            webSite:form.webSite,
        },
    };

    setTimeout(() => {
        axios(config)
            .then(({data}) => {
                if (image) {
                    const config2 = {
                        method: "post",
                        baseURL: `${process.env.REACT_APP_URI_API}/image/imageSponsors/${data.data}`,
                        headers: { token: jwt },
                        data: formData,
                    };
                    axios(config2)
                        .then((e) => {
                            alert("evento creado con exito")
                            getData()
                            resetForm()
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
    <form onSubmit={(e)=>handleSubmit(e)} style={{marginTop:"90px", display:"flex",flexDirection:"column",alignItems:"center"}}>
      <h3>Crear miembro</h3>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleInputChange}
        placeholder="Titulo"
      />
      <input
        type="text"
        name="content"
        value={form.content}
        onChange={handleInputChange}
        placeholder="Descripción"
      />
      <input
        type="text"
        name="webSite"
        value={form.webSite}
        onChange={handleInputChange}
        placeholder="Sitio web"
      />
      <input 
      type="file" 
      onChange={(e) => handleFileChange(e)}
      />
      {
      image3 && <img src={image3}
            style={{
                borderRadius: 10,
                display: "block",
                maxHeight: "auto",
                margin: 10,
                maxWidth: "350px",
            }}></img>
    }
      <button className='button' style={{display:"flex"}}>Crear!</button>
    </form>  
    </div>
  );
}