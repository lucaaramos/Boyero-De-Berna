import React, { useState } from 'react'
import "./index.css"
export const CardMember = ({id,webSite,img,description,name}) => {
    const [showMoreInfo, setShowMoreInfo] = useState(false)
    const handleMoreData = ()=>{
        setShowMoreInfo(!showMoreInfo)
    }
    const safeDescription = description || "";
    const hasImage = Boolean(img && img !== "undefined");
    const imageSrc = hasImage ? `${process.env.REACT_APP_URI_API}/${img}` : null;
    let reduceDescrip
    if(safeDescription.split(" ").length>24){
        reduceDescrip = safeDescription?.split(" ").slice(0,20).join(" ")+"..."
    }else{
        reduceDescrip = safeDescription
    }
  return (
    <div>
            <div className='divCardMembers'>
              {hasImage ? <img src={imageSrc} alt={name}/> : null}
              <strong>{name}</strong>
              <p>{
              safeDescription.length ?
                  showMoreInfo ? safeDescription
                  : reduceDescrip
                : 
                ""}
                </p>
              <div style={{width:"100%", display:"flex",justifyContent:'center',position:"relative",bottom:10}}>
                {
                    safeDescription?.split(" ").length>24 ?
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
