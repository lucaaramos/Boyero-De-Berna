import { useEffect, useState } from 'react';
import useSponsors from './useSponsors';
import CreateSponsors from '../FormsCreate/CreateSponsor';
import { Members } from '../../componets/Members/Members.jsx';



function Sponsors() {
    const {getSponsors} = useSponsors()
    const [sponsors,setSponsors] = useState([])
    const getData = async ()=>{
        try {
          const {data} = await getSponsors();
          console.log(data)
          setSponsors(data);
          window.reload()
        } catch (error) {
          console.error("Error fetching events:", error);
        }
      };
      useEffect(()=>{
        getData()
      },[])
    return (
        <div style={{minHeight:"100vh",marginTop:50}}>
            <CreateSponsors getData={getData}/>
        {/* {
            sponsors?.map(e=><div key={e.id}>
                {e.name}
            </div>) SS
        } */}
        <div>
              <Members></Members>
        </div>
        </div>
    );
}

export default Sponsors;