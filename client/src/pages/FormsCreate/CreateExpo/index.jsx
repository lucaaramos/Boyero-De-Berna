import axios from 'axios';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useUser from '../../../componets/hook/UseUser';
import "../CreateNews/index.css"
import { useNavigate } from 'react-router-dom';


export default function CreateEvent({getData}) {
  const navigate = useNavigate();
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [image, setImage] = useState("");
  const [image3, setImage3] = useState("");
  const { jwt } = useUser()
  const handleDateTimeChange = (dateTime) => {
    setSelectedDateTime(dateTime);
  };
  
  const [form, setForm] = useState({
    title: "",
    description: "",
    place: "",
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
      title: "",
      description: "",
      place: "",
    })
    setImage("")
    setImage3("")
    setSelectedDateTime("")
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
        baseURL: `${process.env.REACT_APP_URI_API}/event`,
        headers: { token: jwt },
        data: {
            title:form.title,
            description: form.description,
            date:selectedDateTime,
            place:form.place
        },
    };

    setTimeout(() => {
        axios(config)
            .then((e) => {
                if (image) {
                    const config2 = {
                        method: "post",
                        baseURL: `${process.env.REACT_APP_URI_API}/image/image/${e.data.id}`,
                        headers: { token: jwt },
                        data: formData,
                    };
                    axios(config2)
                        .then((e) => {
                            alert("evento creado con exito")
                            getData()
                            resetForm()
                            navigate("/exhibitions")
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
      <h3>Crear evento</h3>
      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleInputChange}
        placeholder="Titulo"
      />
      <input
        type="text"
        name="description"
        value={form.description}
        onChange={handleInputChange}
        placeholder="Descripción"
      />
      <DatePicker
        selected={selectedDateTime}
        onChange={handleDateTimeChange}
        dateFormat="yyyy-MM-dd HH:mm"
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Time" 
        placeholderText="seleccione fecha y hora"
      />
      <input
        type="text"
        name="place"
        value={form.place}
        onChange={handleInputChange}
        placeholder="Lugar"
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