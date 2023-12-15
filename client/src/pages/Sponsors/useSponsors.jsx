import axios from "axios";

export default function useSponsors() {
    const getSponsors = ()=>{
        const config ={
            method: "get",
            baseURL: `${process.env.REACT_APP_URI_API}/sponsors/getListSponsors`,
        };
        return axios(config).then(e=> e.data).catch(e=>alert("ocurrio un error intente mas tarde"))
    }
    const getSponsorsAleatory = (amount)=>{
        const config ={
            method: "get",
            baseURL: `${process.env.REACT_APP_URI_API}/sponsors/getSponsorsAleatory/${amount}`,
        };
        return axios(config).then(e=> e.data).catch(e=>alert("ocurrio un error intente mas tarde"))
    }
    return {
        getSponsors,
        getSponsorsAleatory
    }
}