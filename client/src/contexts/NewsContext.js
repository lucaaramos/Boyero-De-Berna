import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

// Crear el contexto
const NewsContext = createContext();

// Definir el estado inicial y el reductor
const initialState = {
  news: []
};

const newsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NEWS':
      return {
        ...state,
        news: action.payload
      };
      case 'ADD_NEWS':
        return {
          ...state,
          news: [...state.news, action.payload]
        };
      case 'DELETE_NEWS':
        return{
          ...state,
          news:[...state.news].filter(newItem=> newItem._id !== action.payload )
        };
      case 'UPDATE_NEWS':
        const updateNews = state.news.map(noticia => {
          if( noticia._id === action.payload){
            return{
              ...noticia,
              title :  action.payload.title,
              content: action.payload.content
            }
          }
          return noticia;
        });
        return {
          ...state,
          news:updateNews
        }
    default:
      return state;
  }
};

// Crear el proveedor
const NewsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(newsReducer, initialState);
    try{
        
    
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URI_API}/news/`)
      .then(response => {
        dispatch({ type: 'SET_NEWS', payload: response.data });
      }) 
      .catch(error => {
        // Manejo de errores
        
      });
  }, [])
  
    } catch(err){
        return err
    };

  return (
    <NewsContext.Provider value={{ state, dispatch }}>
      {children}
    </NewsContext.Provider>
  );
};

// Crear un hook personalizado para usar el contexto
const useNewsContext = () => useContext(NewsContext);

export { NewsProvider, useNewsContext };
