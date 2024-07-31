import {React, useState} from 'react'
import dog from '../../assets/boyero.jpg'
import '../../componets/Members/styles.css'
import { Members } from '../../componets/Members/Members.jsx'
import emailjs from 'emailjs-com';

const SERVICE_ID = 'service_cbbku12';
const TEMPLATE_ID = 'template_ifrhopy';
const USER_ID = '57Rrz8rKoeO0xekMN';
export default function Contact() {
    const [contact, setContact] = useState({
      name:"",
      email:"",
      message:"",
      city:"",
      numberPhone:""
    });
    const handleChange = (e)=>{
      setContact({
        ...contact,
        [e.target.name]:e.target.value
      })
    }
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Parámetros para EmailJS
      const templateParams = {
        from_name: contact.name,
        from_email: contact.email,
        message: contact.message,
        city: contact.city,
        numberPhone: contact.numberPhone
      };
  
      emailjs.send(SERVICE_ID,TEMPLATE_ID, templateParams,USER_ID
      )
        .then((response) => {
          console.log('SUCCESS!', response.status, response.text);
          alert('Mensaje enviado con éxito');
        }, (error) => {
          console.error('FAILED...', error);
          alert('Hubo un error al enviar el mensaje. Por favor, inténtelo de nuevo.');
        });
  
      // Limpiar el formulario después de enviar
      setContact({
        name: "",
        email: "",
        message: "",
        city: "",
        numberPhone: ""
      });
    }
        return (
      <div className='' style={{backgroundImage: `url(${dog})`,display:"flex",flexDirection:"column",alignItems:"center", backgroundRepeat:"no-repeat"}}>
        
        <form className='form' onSubmit={handleSubmit} style={{display:"flex",maxWidth:500,alignItems:'center'}} >
      <div className='div1'>
      <label>
        <input type="text" name="name" placeholder='Nombre y Apellido' value={contact.name} onChange={handleChange} />
      </label>
      <label>
      <input type="text" name="numberPhone" placeholder='Telefono' value={contact.numberPhone} onChange={handleChange} />
      </label>
      <label>
        <input type="text" name="city" placeholder='Ciudad' value={contact.city} onChange={handleChange} />
      </label>
      <label>
        <input type="email" name="email" placeholder='Email' value={contact.email} onChange={handleChange} />
      </label>
      <label>
        <textarea  placeholder='Mensaje' onChange={handleChange} name="message"/>
      </label>
      <br />
      </div>
      <button type="submit" className='button'>Enviar</button>
    </form>
        <div>
              <Members count={4}></Members>
        </div>
    </div>
  )
}
