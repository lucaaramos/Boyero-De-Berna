import React, { useEffect, useState } from 'react'
import { CardMember } from '../Card/CardMember'
import useSponsors from '../../pages/Sponsors/useSponsors'

export const Members = ({count}) => {
  const {getSponsorsAleatory} = useSponsors()
  const [sponsors,setSponsors] = useState([])
  const getData =async ()=>{
    try {
      const {data} = await getSponsorsAleatory(count);
      console.log(data)
      setSponsors(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
  useEffect(()=>{
    getData()
  },[])
    return (
        <div className='membersdiv'>
              {
                sponsors.map((e,i)=> e==null ? <div key={i}></div> : <CardMember key={e.id} id={e.id} webSite={e.web_site} description={e?.content} img={e?.image} name={e?.name}/>)
              }
        </div>
  );
}
