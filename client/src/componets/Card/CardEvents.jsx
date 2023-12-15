import React from 'react'
import { Link } from 'react-router-dom'
import "./index.css"
export const CardEvents = ({image,title,date,user,description,id}) => {
  const originalDateTime = new Date(date);

  const formattedDate = `${originalDateTime.getFullYear()}-${(originalDateTime.getMonth() + 1).toString().padStart(2, '0')}-${originalDateTime.getDate().toString().padStart(2, '0')}`;
  const formattedTime = `${originalDateTime.getHours().toString().padStart(2, '0')}:${originalDateTime.getMinutes().toString().padStart(2, '0')}`;

  return (
    <div className='containImageCards'>  
            <h3 style={{color:"#b06440"}}>{title}</h3>
      <div style={{display:"flex",flexDirection:"row"}}>
        <div>
            <img className='imageCard' src={`${process.env.REACT_APP_URI_API}${image}`} alt={title}/>
        </div>
        <div className='containDataCards'>
            <p>Descripción: {description}</p>
            <p>Fecha: {formattedDate} - {formattedTime}</p>
        </div>
      </div> 
      <div className='containButtonCards'>
        <Link to={`/registar-expo/${title}/${id}`} className='sabermas'>Queremos participar!</Link>
      </div>
    </div>
  )
}
