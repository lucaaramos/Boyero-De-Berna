import React,{ useEffect, useState} from "react";

const Context = React.createContext({})

export const UserContext= ({children})=>{
  const [jwt,setJWT] = useState(()=>window.sessionStorage.getItem("jwt"))
    const [user,setUser] = useState(()=>JSON.parse(window.sessionStorage.getItem("user")))
    const [isPhone,setIsPhone] = useState(true)
    const [eventForEdit,setEventForEdit] = useState(null)
  useEffect(()=>{
    const userAgent = navigator.userAgent;
    setIsPhone(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent));
  })
    return <Context.Provider value={{isPhone,jwt,setJWT,user,setUser,eventForEdit,setEventForEdit}}>
    {children}
    </Context.Provider>
}

export default Context