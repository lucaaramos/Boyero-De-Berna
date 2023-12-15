import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CardEvents } from '../Card/CardEvents'
import { EVENTS } from './listEvents'
import "./index.css"
import axios from 'axios'
export const Events = () => {
  const [events,setEvents] = useState()
  useEffect(()=>{
    const config = {
      method: "get",
      baseURL: `${process.env.REACT_APP_URI_API}/event/futureEvents`,
    }
    axios(config).then(e=>setEvents(e.data)).catch(error=>alert("error intente mas tarde"))
  },[])
  return events && events?.length ?
      <div className='event'>
      <h5 className='ev' style={{textAlign:"center"}}>Próximos eventos</h5>
      <div>
        {
            events?.map((e)=><CardEvents key={e.id} id={e.id} image={e.image} title={e.title} date={e.date} user={e.user} description={e.description}/>)
        }
      </div>
    </div>
    :
    <></>
}
