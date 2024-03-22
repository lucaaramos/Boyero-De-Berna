// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import { CardEvents } from '../Card/CardEvents'
// import { EVENTS } from './listEvents'
// import "./index.css"
// import axios from 'axios'
// export const Events = () => {
//   const [events,setEvents] = useState()
//   useEffect(()=>{
//     const config = {
//       method: "get",
//       baseURL: `${process.env.REACT_APP_URI_API}/event/futureEvents`,
//     }
//     axios(config).then(e=>setEvents(e.data)).catch(error=>alert("error intente mas tarde"))
//   },[])
//   return events && events?.length ?
//       <div className='event'>
//       <h5 className='ev' style={{textAlign:"center"}}>Próximos eventos</h5>
//       <div>
//         {
//             events?.map((e)=><CardEvents key={e.id} id={e.id} image={e.image} title={e.title} date={e.date} user={e.user} description={e.description}/>)
//         }
//       </div>
//     </div>
//     :
//     <></>
// }
import React, { useEffect, useState } from 'react'
import { CardEvents } from '../Card/CardEvents'
import axios from 'axios'

export const Events = () => {
  const [events, setEvents] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URI_API}/event/futureEvents`);
        setEvents(response.data);
      } catch (error) {
        setError(true);
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className='event'>
      <h5 className='ev' style={{textAlign: "center"}}>Próximos eventos</h5>
      {error && <div>Error al cargar los eventos. Intente de nuevo más tarde.</div>}
      {events && events.length > 0 ? (
        <div>
          {events.map((event) => (
            <CardEvents
              key={event.id}
              id={event.id}
              image={event.image}
              title={event.title}
              date={event.date}
              user={event.user}
              description={event.description}
            />
          ))}
        </div>
      ) : (
        <div>No hay eventos disponibles.</div>
      )}
    </div>
  );
}

