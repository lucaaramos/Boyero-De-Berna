// import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";
import Validate from "./Validate";
import "./style.css"
import boyero from '../../assets/boyero.jpg'
export default function ContainerRegister() {
  const navigate = useNavigate();
  const [user,setUser] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);

const handleSubmit = (e) => {
  e.preventDefault();
  try {
    if (Object.keys(errors).length) {
      setShowErrors(true);
      return
    }
    setShowErrors(false);
    axios
      .post(`${process.env.REACT_APP_URI_API}/user/register`, {
        name: user.name,
        email: user.email,
        password: user.password,
      })
      .then((res) => {
        if (res.status === 201) return alert(res.data);
        if (res.status === 202) return alert(res.data);
        else navigate("/ingresar");
      });
  } catch (err) {
    alert(err.response.data);
  }
}

const handleChange = (e)=>{
  setUser({
    ...user,
    [e.target.name]:e.target.value
  })
  setErrors(Validate({
    ...user,
    [e.target.name]: e.target.value
  }))
} 

  return (
    <div className="fondo" style={{backgroundImage: `url('https://www.infobae.com/new-resizer/kCOWOUKNn-GdFvakwKh85YlBkAY=/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/LC5MOYPX2JA25NY5H5KKMPREJI.jpg')`}}>
      <div className="register">
        <h2 style={{marginBottom:30}}>Registre su usuario</h2>
        <div>
              <form onSubmit={handleSubmit} className="formRegister">
                  <div>
                    Nombre y Apellido
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Nombre y Apellido"
                    value={user.name} 
                    onChange={handleChange}
                  />
                  {showErrors && errors.name && (
                    <p style={{ marginTop: "0.5rem" }}>
                      {errors.name}
                    </p>
                  )}
                  <div>
                    E-mail
                  </div>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="e-mail *"
                    value={user.email}
                    onChange={handleChange}
                  />
                  {showErrors && errors.email && (
                    <p style={{ marginTop: "0.5rem" }}>
                      {errors.email}
                    </p>
                  )}
                  <div >
                    Contraseña
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Ejemplo123%"
                    value={user.password}
                    onChange={handleChange}
                  />
                  {showErrors && errors.password && (
                    <p style={{ marginTop: "0.5rem" }}>
                      {errors.password}
                    </p>
                  )}
                <button className="button" style={{marginTop:20}} type="submit">Registrarme!</button>
              </form>
    </div>
        </div>
      </div>
  );
}
