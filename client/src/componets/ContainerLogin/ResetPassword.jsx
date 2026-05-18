import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || password.length < 6) {
      return alert('La contraseña debe tener al menos 6 caracteres');
    }
    if (password !== confirmPassword) {
      return alert('Las contraseñas no coinciden');
    }

    try {
      setLoading(true);
      await axios.post(`${process.env.REACT_APP_URI_API}/user/tokenPassword/${token}`, { password });
      alert('Contraseña actualizada con éxito. Ahora puede iniciar sesión.');
      navigate('/ingresar');
    } catch (err) {
      const message = err?.response?.data?.message || err?.response?.data || 'No se pudo actualizar la contraseña';
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="fondo"
        style={{
          backgroundImage:
            "url('https://www.infobae.com/new-resizer/kCOWOUKNn-GdFvakwKh85YlBkAY=/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/LC5MOYPX2JA25NY5H5KKMPREJI.jpg')",
        }}
      >
        <div className="register">
          <h2 style={{ marginBottom: 30 }}>Restablecer contraseña</h2>
          <div>
            <form className="formRegister" onSubmit={handleSubmit}>
              <div>Nueva contraseña</div>
              <input
                type="password"
                name="password"
                placeholder="Nueva contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div>Confirmar contraseña</div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <div className="buttonsLogin">
                <button className="button" style={{ color: 'rgb(255, 255, 255)' }} disabled={loading}>
                  {loading ? 'Actualizando...' : 'Guardar contraseña'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
