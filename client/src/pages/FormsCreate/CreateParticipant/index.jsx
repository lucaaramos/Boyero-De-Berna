import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { sex } from './utils';
import useUser from '../../../componets/hook/UseUser';
import ModalPortal from '../../../componets/modal/index.jsx'
import './Form.css'
export default function CreateParticipant() {
  const { title, id } = useParams();
  const {jwt,user} = useUser()
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [ myDogs, setMyDogs ] = useState([]) 
  const [form, setForm] = useState({
    names: "",
    sex: "",
    race: "",
    registration_number: "",
    date_birth: "",
    name_dad: "",
    name_mom: "",
    breeder: "",
    name_owner: "",
    category_id: "",
    id_user: user?.id,
    expositor: ""
  });

  const selectedOldDog =(dog) => {
    setForm({
      names: dog.name,
      sex: dog.sex,
      race: dog.race,
      registration_number: dog.registration_number,
      date_birth: dog.date_birth,
      name_dad:dog.name_dad,
      name_mom: dog.name_mom,
      breeder: dog.breeder,
      name_owner: dog.name_owner,
      category_id: dog.category_id,
      id_user: user?.id,
      expositor: dog.expositor
    })
  }

  const [error, setError] = useState("");

  useEffect(() => {
    const config = {
      method: "get",
      baseURL: `${process.env.REACT_APP_URI_API}/event/categority`,
    };
    axios(config)
      .then((response) => setCategory(response.data))
      .catch(() => alert("Estamos experimentando errores, inténtelo más tarde"));
    if(user){
      const config2 = {
        method: "get",
        baseURL: `${process.env.REACT_APP_URI_API}/user/dogofuser`,
        headers:{token:jwt}
      };
      axios(config2).then(e=>{
        setMyDogs(e.data.result)
      })
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    for (const key of Object.keys(form)) {
      if (!form[key]) {
        setError(`El campo "${key}" es obligatorio`);
        return false; // Devuelve el primer error que encuentre
      }
    }
    setError(""); // No hay errores
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isFormValid()) {
      return;
    }

    const config = {
      method: "post",
      baseURL: `${process.env.REACT_APP_URI_API}/participant/${id}/${form.category_id}`,
      data: form,
    };

    axios(config)
      .then((res) => {
       if(res.status===200) {
        alert("Solicitud enviada con éxito. Pronto nos pondremos en contacto con usted.");
        navigate("/")
       }
       if(res.status===201) alert(res.data)
      })
      .catch((error) => {
        console.log("Error en la petición para actualizar información del usuario:", error);
      });
  };
  return (

    <div className='container'>
      {
        myDogs.length ?
        <div>
          <p>Tienes ejemplares registrados anteriormente puedes inscribirlos a este evento seleccionandolos!</p>
          <div>
            
            <div>
              <ul>
              {
                myDogs.map(d=><ul style={{display:"flex", padding:10, color:"rgb(176, 100, 64)"}} onClick={()=>selectedOldDog(d)} key={d.id}>{d.name} número de registro:  <strong>{d.registration_number}</strong></ul>)
              } 
             </ul>
            </div>
          </div>
        </div> : <></>
      }
      <div className='divFormEvents'>

      <h3>Inscripción a {title}</h3>
      <form onSubmit={handleSubmit} style={{ marginTop: "90px" }}>
        <input
          type="text"
          name="race"
          value={form.race}
          onChange={handleInputChange}
          placeholder="Raza"
        />
        {error && error.includes("race") && <p className="error">{error}</p>}
        <input
          type="number"
          name="registration_number"
          value={form.registration_number}
          onChange={handleInputChange}
          placeholder="Número de registro"
        />
        {error && error.includes("registration_number")&& <p className="error">{error}</p>}
        
        <input
          type="text"
          name="names"
          value={form.names}
          onChange={handleInputChange}
          placeholder="Nombre"
        />
        {error && error.includes("names") && <p className="error">{error}</p>}

        <select onChange={handleInputChange} name="sex" value={form.sex}>
          <option selected value="" disabled>Seleccione sexo</option>
          {sex.map((s) => (
            <option key={s.id} value={s.description}>
              {s.description}
            </option>
          ))}
        </select>
        {error && error.includes("sex") && <p className="error">{error}</p>}

        <input
          type="date"
          name="date_birth"
          value={form.date_birth}
          onChange={handleInputChange}
          placeholder="Fecha de nacimiento"
        />
        {error && error.includes("date_birth") && <p className="error">{error}</p>}
        <input
          type="text"
          name="name_dad"
          value={form.name_dad}
          onChange={handleInputChange}
          placeholder="Nombre de padre"
        />
        {error && error.includes("name_dad")&& <p className="error">{error}</p>}

        <input
          type="text"
          name="name_mom"
          value={form.name_mom}
          onChange={handleInputChange}
          placeholder="Nombre de madre"
        />
        {error && error.includes("name_mom")&& <p className="error">{error}</p>}
        <input
          type="text"
          name="breeder"
          value={form.breeder}
          onChange={handleInputChange}
          placeholder="Criador"
        />
        {error && error.includes("breeder")&& <p className="error">{error}</p>}

        <input
          type="text"
          name="name_owner"
          value={form.name_owner}
          onChange={handleInputChange}
          placeholder="Propietario"
        />
        {error && error.includes("name_owner")&& <p className="error">{error}</p>}
        

        <select onChange={handleInputChange} name="category_id" value={form.category_id}>
          <option selected value="" disabled>Seleccionar categoría</option>
          {category.map((e) => (
            <option key={e.id} value={e.id}>
              {e.description}
            </option>
          ))}
        </select>
        {error && error.includes("category_id")&& <p className="error">{error}</p>}

        <input
          type="text"
          name="expositor"
          value={form.expositor}
          onChange={handleInputChange}
          placeholder="Expositor"
        />
        {error && error.includes("name_owner")&& <p className="error">{error}</p>}
        <button className="button">
          Crear!
        </button>
      </form>
      </div>
    </div>
  );
}