import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNewsContext } from "../../contexts/NewsContext";
import useUser from "./UseUser";

export default function Delete() {
    const {state, dispatch } = useNewsContext()
    const { news } = state;
    const {jwt, user } = useUser();

    const DeleteNew = async (noticiaId) => {
        try {
          const config = {
            method: 'put',
            baseURL: `${process.env.REACT_APP_URI_API}/news/delete/${noticiaId}`,
            headers: { token: jwt }
          };
    
          const response = await axios(config);
    
          if (response.status === 200) {
            dispatch({ type: 'DELETE_NEWS', payload: noticiaId });
          }
        } catch (error) {
          console.error('Error al eliminar noticia:', error);
        }
    
        
      };

  return {DeleteNew}
    
  
}
