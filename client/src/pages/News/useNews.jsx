import axios from 'axios';
import { useNewsContext } from '../../contexts/NewsContext';
import useUser from '../../componets/hook/UseUser'; // Asegúrate de importar el hook correcto

export function useNews() {
  const { dispatch } = useNewsContext();
  const { jwt } = useUser();

  const handleUpdate = async (noticiaId, {title, content}) => {
    try {
      const config = {
        method: 'put',
        baseURL: `${process.env.REACT_APP_URI_API}/news/${noticiaId}`,
        headers: { token: jwt },
        data: {title, content}
        
      };

      const response = await axios(config);

      if (response.status === 200) {
        dispatch({ type: 'UPDATE_NEWS', payload: response.data });
      }
    } catch (error) {
      console.error('Error al actualizar noticia:', error);
    }
  };

  return { handleUpdate };
}
