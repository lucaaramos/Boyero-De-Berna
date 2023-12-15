import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "../FormsCreate/CreateExpo/index.css"
import { useNavigate, useParams } from 'react-router-dom';
import useUser from '../../componets/hook/UseUser';
export default function UpdateEvent() {
  const navigate = useNavigate();
  const {id} = useParams() 
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [image, setImage] = useState("");
  const [image3, setImage3] = useState("");
  const { jwt} = useUser()
  const [form, setForm] = useState();
    useEffect(()=>{
        const config = {
            method: "get",
            baseURL: `${process.env.REACT_APP_URI_API}/event/${id}`,
            headers: { token: jwt },
        }
        axios(config).then(e=>{
            setForm(e.data[0])
        
        }).catch(e=>alert("ocurrio un error"))
    },[])

  const handleDateTimeChange = (dateTime) => {
    setSelectedDateTime(dateTime);
  };

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
      baseURL: `${process.env.REACT_APP_URI_API}/event/update/${id}`,
      headers:{token:jwt},
      data:{
        title : form.title,
        description : form.description,
        place : form.place,
        date:selectedDateTime,
      }
  };

    setTimeout(() => {
        axios(config)
            .then((e) => {
                if (image) {
                    const config2 = {
                        method: "post",
                        baseURL: `${process.env.REACT_APP_URI_API}/image/image/${id}`,
                        headers: { token: jwt },
                        data: formData,
                    };
                    axios(config2)
                        .then((e) => {
                            alert("evento creado con exito")
                            navigate("/exhibitions")
                        })
                        .catch((error) => {
                            console.log(
                                "Error en la petición para actualizar la imagen:",
                                error
                            );
                        });
                }
                else {
                    alert("evento creado con exito")
                    navigate("/exhibitions")
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
const originalDateTime = new Date(form?.date);

  const formattedDate = `${originalDateTime.getFullYear()}-${(originalDateTime.getMonth() + 1).toString().padStart(2, '0')}-${originalDateTime.getDate().toString().padStart(2, '0')}`;
  const formattedTime = `${originalDateTime.getHours().toString().padStart(2, '0')}:${originalDateTime.getMinutes().toString().padStart(2, '0')}`;

  return (
    <div className='divFormEvents'>
     <h3>Actualizar evento</h3>
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
        name="description"
        value={form?.description}
        onChange={handleInputChange}
        placeholder="Descripción"
      />
      <div style={{display:"flex",flexDirection:"column"}}>
        {form && `Fecha original: ${formattedDate} - ${formattedTime}`}
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
      </div>
      <input
        type="text"
        name="place"
        value={form?.place}
        onChange={handleInputChange}
        placeholder="Lugar"
      />
      <input 
      type="file" 
      onChange={(e) => handleFileChange(e)}
      />
      <button className='button'>Editar evento!</button>
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