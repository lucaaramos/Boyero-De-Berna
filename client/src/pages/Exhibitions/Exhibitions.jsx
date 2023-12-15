import React, { useEffect, useState } from "react";
import "./index.css";
import { CardExpo } from "../../componets/Card/CardExpo";
import img from '../../assets/boyero.jpg'
import copa from "../../assets/copa.png";
import useUser from "../../componets/hook/UseUser"

import useExhibitions from "./useExhibitons";
import CreateEvent from "../FormsCreate/CreateExpo";
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import  autoTable  from 'jspdf-autotable';
export default function Exhibitions() {
  const {user} = useUser()
  const [events,setEvents] = useState([])
  const {updateEvent} = useExhibitions()
  const [selectedEventId, setSelectedEventId] = useState(null)

  const getData =async ()=>{
    try {
      const data = await updateEvent();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect( () => {
    getData();
  },[])

  const handleEventClick = async (eventId) => {
    setSelectedEventId(eventId); // Al hacer clic en un evento, se establece su ID
    try {
      if (!selectedEventId) {
        console.error("No se ha seleccionado ningún evento.");
        return;
      }
  
      const response = await fetch(`${process.env.REACT_APP_URI_API}/participant/events/${selectedEventId}`);
      const data = await response.json();
  
      const doc = new jsPDF();
  
      const headers = ['ID', 'Nombre', 'Sexo', 'Raza', 'Categoría', 'Nacimiento', 'Dueño', 'Expositor']; // Encabezados de la tabla
      const tableData = data.map(participant => [participant.id, participant.name, participant.sex, participant.race, participant.category_id, participant.date_birth, participant.name_owner, participant.expositor]);
  
      doc.autoTable({
        head: [headers],
        body: tableData,
      });
  
      doc.save('participantes_evento.pdf');
    } catch (error) {
      console.error("Error exporting to PDF:", error);
    }
  };



  return (
    <>
    <div className="aboutDivBack">
      <img src={img} className='responsive-image'  alt=""></img>
      <div style={{textAlign:"center",padding:10}}>
    
      <h1 style={{color: "#B06440"}}>Exposiciones</h1>
        {
          user?.type === "admin" ? <CreateEvent getData={getData}/>:<></>
        }
      </div>
          <div className="cont">
            <iframe className="iframe" title="unique" src={copa}></iframe>
          </div>
      <div className="expo">
        <div className="containerr">
          <h3>Calendario 2023</h3>
          <div className="divContainerCardExpo" >
            {events?.length && events?.map((e) => { 
              return <div key={e.id}>
              <CardExpo onClick={() => handleEventClick(e.id)}  getData={getData} key={e.id} day={e.date} id={e.id} image={e.image} title={e.title} place={e.place} description={e.description}/>
              <button onClick={() => handleEventClick(e.id)}>Exportar PDF</button>
              </div>
              })}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
