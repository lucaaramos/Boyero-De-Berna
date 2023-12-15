import { useCallback, useContext } from 'react'
import Context from '../globalContext/userContext'
import LoginService from '../../services/logservice'
export default function useUser() {
    const {isPhone,jwt,setJWT,user,setUser,eventForEdit,setEventForEdit} = useContext(Context)

    const login = useCallback( async ({email,password})=>{
        LoginService({email,password}).then(res=>{
            window.sessionStorage.setItem("jwt",res.token)
            window.sessionStorage.setItem("user",JSON.stringify(res.user))
            setJWT(res.token)
            setUser(res.user)
            //(res)
        }).catch((err)=>{
            window.sessionStorage.removeItem("jwt")
            window.sessionStorage.removeItem("user")
            if(err.response.status===401)alert(err.response.data)
        })
    },[setJWT])

    const logout = useCallback(()=>{
        window.sessionStorage.removeItem("jwt")
        window.sessionStorage.removeItem("user")
        setJWT(null)
        setUser(null)
    },[setJWT])


    return {
    isLoggedIn:Boolean(jwt),
    isPhone,
    login,
    logout,
    user,
    jwt,
    eventForEdit,
    setEventForEdit
    }
}
