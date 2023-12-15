import React, { useState } from 'react'
import "./index.css"
export const CardMember = ({id,webSite,img,description,name}) => {
    const [showMoreInfo, setShowMoreInfo] = useState(false)
    const handleMoreData = ()=>{
        setShowMoreInfo(!showMoreInfo)
    }
    let reduceDescrip
    if(description.split(" ").length>24){
        reduceDescrip = description?.split(" ").slice(0,20).join(" ")+"..."
    }else{
        reduceDescrip = description
    }
  return (
    <div>
            <div className='divCardMembers'>
              <img src={`${process.env.REACT_APP_URI_API}/${img}`} alt={name}/>
              <strong>{name}</strong>
              <p>{
              description.length ?
                  showMoreInfo ? description 
                  : reduceDescrip
                : 
                ""}
                </p>
              <div style={{width:"100%", display:"flex",justifyContent:'center',position:"relative",bottom:10}}>
                {
                    description?.split(" ").length>24 ?
                        showMoreInfo ?
                        <div style={{display:"flex",width:"100%",justifyContent:"space-around"}}><a href={webSite} target="_blank">Más info</a> <strong className='strongCard' onClick={handleMoreData}>Ver menos</strong></div> 
                        :
                        <strong className='strongCard' onClick={handleMoreData}>Ver más</strong>
                        :
                        <a href={webSite} target="_blank">Más info</a>
                }
              </div>
            </div>
    </div>
  )
}
