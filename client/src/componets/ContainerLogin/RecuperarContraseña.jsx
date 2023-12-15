import React from 'react'

export default function RecuperarContraseña() {
  return (
    <div>
        <div className="fondo" style={{backgroundImage: `url('https://www.infobae.com/new-resizer/kCOWOUKNn-GdFvakwKh85YlBkAY=/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/LC5MOYPX2JA25NY5H5KKMPREJI.jpg')`}}>
        <div className="register">
          <h2 style={{marginBottom:30}}>Ingrese su correo electronico</h2>
            <div>
              <form className="formRegister">
                <div>Email</div>
                <input type="email" name="email" placeholder="email"/>
                <span></span>
              <div className="buttonsLogin">
                <button className="button"  style={{ color: "rgb(255, 255, 255)" }}>Recuperar contraseña</button>
              </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  )
}
 