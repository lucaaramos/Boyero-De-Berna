import { useState } from "react";
import axios from "axios";

export default function useExhibitions() {
    const updateEvent = ()=>{
        const config ={
            method: "get",
            baseURL: `${process.env.REACT_APP_URI_API}/event`,
        };
        return axios(config).then(e=> e.data).catch(e=>alert("ocurrio un error intente mas tarde"))
    }
    return {
        updateEvent
    }
}