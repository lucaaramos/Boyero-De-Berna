import {React, useState} from 'react'
import dog from '../../assets/boyero.jpg'
import '../../componets/Members/styles.css'
import { Members } from '../../componets/Members/Members.jsx'

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
    function handleSubmit(e) {
      e.preventDefault();
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
