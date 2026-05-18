import React, { useState } from 'react';
import axios from 'axios';

export default function RecuperarContraseña() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return alert('Ingrese un email');

    try {
      setLoading(true);
      await axios.post(`${process.env.REACT_APP_URI_API}/user/request-password`, { email });
      alert('Si el correo existe, recibirás un enlace para restablecer contraseña.');
      setEmail('');
    } catch (err) {
      const message = err?.response?.data?.message || 'No se pudo procesar la solicitud';
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
          <h2 style={{ marginBottom: 30 }}>Ingrese su correo electronico</h2>
          <div>
            <form className="formRegister" onSubmit={handleSubmit}>
              <div>Email</div>
              <input
                type="email"
                name="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span></span>
              <div className="buttonsLogin">
                <button className="button" style={{ color: 'rgb(255, 255, 255)' }} disabled={loading}>
                  {loading ? 'Enviando...' : 'Recuperar contraseña'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
