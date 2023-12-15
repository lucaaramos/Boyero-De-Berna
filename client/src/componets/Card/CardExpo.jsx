import React, { useEffect, useState } from 'react'
import '../../pages/Exhibitions/index.css'
import "./index.css"
import axios from 'axios'
import useUser from '../hook/UseUser'
import { Link } from 'react-router-dom'
export const CardExpo = ({getData,day,title,image,place,id,description}) => {
  const {user,jwt} = useUser()

  const originalDateTime = new Date(day);
  const currentDate = new Date();
  const isNewExpo = originalDateTime > currentDate

  const formattedDate = `${originalDateTime.getFullYear()}-${(originalDateTime.getMonth() + 1).toString().padStart(2, '0')}-${originalDateTime.getDate().toString().padStart(2, '0')}`;
  const formattedTime = `${originalDateTime.getHours().toString().padStart(2, '0')}:${originalDateTime.getMinutes().toString().padStart(2, '0')}`;

  const handleDelete =()=> {
  const config = {
      method: "put",
      baseURL: `${process.env.REACT_APP_URI_API}/event/delete/${id}`,
      headers:{token:jwt}
  };
  axios(config).then(e=>{
    getData()
    alert("eliminado con exito")
  }).catch(e=>alert("ocurrio un error intente mas tarde"))
  }
  return (
    <div className='cardExpo'>
      {
        (user && user.type === "admin") ? <div style={{marginBottom:"10px"}}><button className='button' onClick={()=>handleDelete()}>borrar</button> 
        <button className='button'>
          <Link     to={{
              pathname: `actualizar-expo/${id}`,
    }}
    style={{ color: "#FFF" }}>editar</Link>
        </button> </div>: <></>
      }
        <img className='imgCardExpo' src={`${process.env.REACT_APP_URI_API}${image}`} alt=''/>
        <div style={{color:"#fff"}}>{title}</div>
        <div style={{color:"#fff"}}> Fecha: {formattedDate} - {formattedTime}</div>
        <div style={{color:"#fff"}}> Descripción: {description}</div>
        <div style={{color:"#fff"}}>Lugar: {place}</div>
        {
          isNewExpo ? <Link to={`/registar-expo/${title}/${id}`} className='sabermas' >Queremos participar!</Link> : <></>
        }
        </div>
  )
}