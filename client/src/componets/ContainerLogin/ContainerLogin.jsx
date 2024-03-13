import { useEffect, useState } from "react";
import useUser from "../hook/UseUser";
import { useNavigate } from "react-router-dom";

export default function ContainerLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoggedIn } = useUser();
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (isLoggedIn) navigate("/");
    
  }, [isLoggedIn, navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const initSession = async (e) => {
    const { email, password } = formData;
    e.preventDefault();
    if (email || password) {
      login({ email, password });
    }
  };

  return (
      <div className="fondo" style={{backgroundImage: `url('https://www.infobae.com/new-resizer/kCOWOUKNn-GdFvakwKh85YlBkAY=/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/LC5MOYPX2JA25NY5H5KKMPREJI.jpg')`}}>
        <div className="register">
          <h2 style={{marginBottom:30}}>Inicio de sesión</h2>
            <div>
              <form className="formRegister">
                <div>Email</div>
                <input type="email" name="email" onChange={(e) => {onChange(e);}} placeholder="E-Mail*" value={formData.email} required />
                <div>Password</div>
                <input name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={(e) => {onChange(e)}} placeholder="Contraseña*" required />
                <span className={showPassword ? "fa fa-fw fa-eye-slash field-icon toggle-password w-20 mx-2 my-auto bg-light" : "fa fa-fw fa-eye field-icon toggle-password w-20 mx-2 my-auto bg-light rounded"}onClick={togglePassword}></span>
              <div className="buttonsLogin">
                <button type="submit" className="button" onClick={initSession}>Inicia Sesión</button>
                <button className="button" onClick={() => navigate("/registro")} style={{ color: "rgb(255, 255, 255)" }}>Crear Usuario</button>
                {/* <button className="button" onClick={() => navigate("/recuperar-contraseña")} style={{ color: "rgb(255, 255, 255)" }}>Olvidaste Contraseña?</button> */}
              </div>
          </form>
        </div>
      </div>
    </div>
  );
}
