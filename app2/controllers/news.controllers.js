const conn = require("../config/config");

const getAllNoticias = (req, res) => {
  try {
    conn.query(
      `SELECT news.*, users.id AS idUser, users.name, users.email 
      FROM news 
      JOIN users ON news.user_id = users.id 
      WHERE news.status = 1`,
      (error, results) => {
        if (error) {
          res.status(500).json({ error: "Error al consultar noticias" });
        } else {
          let formattedResults = results.map(result => {
            return {
              id: result.id,
              title: result.title,
              content: result.content,
              image: result?.image !== "undefined" ? result?.image : "https://th.bing.com/th/id/OIP.KCBUNS5Iy8kyliWRZRlSOAAAAA?pid=ImgDet&rs=1",
              user: {
                id: result.idUser,
                name: result.name,
                email: result.email
              }
            };
          });
          res.status(200).json(formattedResults);
        }
      }
    );
  } catch (err) {
    res.status(404).json({ error: "Error al consultar noticias" });
  }
};


const getById = (req, res) => {
  const noticiaId = req.params.id;

try {
    conn.query(
      `SELECT news.*, users.id AS idUser, users.name, users.email 
      FROM news 
      JOIN users ON news.user_id = users.id 
      WHERE news.id = ? AND news.status = 1`,
      [noticiaId],
      (error, results) => {
        if (error) {
          res.status(500).json({ error: "Error al consultar la noticia" });
        } else {
          if (results.length === 0) {
            res.status(404).json({ error: "Noticia no encontrada" });
          } else {
            const result = results[0];
            const formattedResult = {
              id: result.id,
              title: result.title,
              content: result.content,
              image: result?.image !== "undefined" ? result?.image : "https://th.bing.com/th/id/OIP.KCBUNS5Iy8kyliWRZRlSOAAAAA?pid=ImgDet&rs=1",
              user: {
                id: result.idUser,
                name: result.name,
                email: result.email
              }
            };
            res.status(200).json(formattedResult);
          }
        }
      }
    );
  } catch (err) {
    res.status(404).json({ error: "Error al consultar la noticia" });
  }
};

const AgregarNoticia = (req, res) => {
  const { title, content } = req.body;
  const { user } = req;
  try{
    if(user.type != "admin") 
      return res.status(403).json({ error: "Acceso denegado" });
  if (!title || !content) {
    return res.status(400).json({ error: "Faltan datos requeridos" });
  }
    const sqlQuery = `INSERT INTO news (title, user_id, content, publication_date) VALUES ("${title}", ${user.id}, "${content}", now());`;
       conn.query(sqlQuery, (err, resp) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({ id: resp?.insertId });
    });
  } catch (err) {
    res.status(404).send(err);
  }
};

const DeleteNew = (req, res) => {
  let id = req.params.id;
  const { user } = req;
  if (user.type != "admin") {
    return res.status(401).json({ error: "Acceso denegado" });
  }
  try {
    const sqlQuery = "UPDATE news set status = 0 WHERE id =  " + id;

    conn.query(sqlQuery, (err, resultado) => {
      if (err) {
        // Si hay un error, enviar una respuesta con el error
        res.status(500).json({ error: "Error al eliminar la noticia" });
      } else {
        // Verificar si se eliminó alguna fila en la base de datos
        if (resultado.affectedRows > 0) {
          // Si se eliminó correctamente, enviar una respuesta de éxito
          res.json({ message: id });
        } else {
          // Si no se encontró la noticia con el ID proporcionado, enviar un mensaje de error
          res.status(404).json({ error: "Noticia no encontrada" });
        }
      }
    });
  } catch (err) {
    // Si ocurre una excepción, enviar una respuesta con un mensaje de error
    res.status(500).json({ error: "Error en el servidor" });
  }
};

const UpdateNew = (req, res) => {
  const { user } = req;
  const { id } = req.params;
  const { title, content } = req.body;

  if (!user || user.type !== "admin") {
    return res.status(401).json({ error: "Acceso denegado" });
  }

  if (!title || !content) {
    return res.status(400).json({ error: "Faltan datos requeridos" });
  }

  const sqlQuery = `UPDATE news SET title = '${title}', content = '${content}' WHERE id = ${id}`;

  conn.query(sqlQuery, (err, resultado) => {
    if (err) {
      return res.status(500).json({ error: "Error en la base de datos" });
    }

    // Verificar si se actualizó alguna fila en la base de datos
    if (resultado.affectedRows > 0) {
      return res.status(200).json({ message: "Noticia actualizada exitosamente" });
    } else {
      return res.status(404).json({ error: "Noticia no encontrada" });
    }
  });
};


module.exports = {
  getAllNoticias,
  AgregarNoticia,
  DeleteNew,
  UpdateNew,
  getById,
};
