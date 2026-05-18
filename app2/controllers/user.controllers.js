const conn = require("../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { sendRecoveryPasswordEmail } = require("../lib/emails");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET ;
const JWT_PASSWORD_RESET_SECRET = process.env.JWT_PASSWORD_RESET_SECRET || "change-me-reset-secret";
const BCRYPT_ROUNDS = Number(process.env.BCRYPT_ROUNDS || 10);
const ENSURE_PASSWORD_RESET_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS password_reset_tokens (
    id INT NOT NULL AUTO_INCREMENT,
    token TEXT NOT NULL,
    user_id INT NOT NULL,
    status TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX idx_password_reset_user_id (user_id),
    INDEX idx_password_reset_status (status)
  );
`;

const sanitizeUser = (user) => {
  if (!user) return user;
  const { password, ...safeUser } = user;
  return safeUser;
};

const register = (req, res) => {
  const { name, password, email } = req.body;
  const querySearchUserSQL = "SELECT * FROM users WHERE email = ?";
  const queryIntroSQL = 'INSERT INTO users (status,name, password, email,type) VALUES (1,?,?,?,"client")';

  try {
    if (!(name?.length && password?.length && email?.length)) {
      return res.status(202).send("missing data");
    }

    conn.query(querySearchUserSQL, [email], async (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.length) return res.status(201).send("have an user created with this email: " + email);

      const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
      conn.query(queryIntroSQL, [name, passwordHash, email], (insertErr) => {
        if (insertErr) return res.status(500).send(insertErr);
        return res.status(200).send(true);
      });
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const getUsers = (_req, res) => {
  try {
    conn.query("SELECT * FROM users;", (error, results) => {
      if (error) throw error;
      const safeUsers = results.map(sanitizeUser);
      return res.status(200).send({ users: safeUsers });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

const login = (req, res) => {
  const { email, password } = req.body;
  const querySearchUserSQL = "SELECT * FROM users WHERE email = ?";

  try {
    conn.query(querySearchUserSQL, [email], async (err, result) => {
      if (err) return res.status(500).send(err);
      if (!result?.length) return res.status(401).send("invalid user or password");

      const user = result[0];
      const passwordCorrect = await bcrypt.compare(password, user.password);
      if (!passwordCorrect) return res.status(401).send("invalid user or password");

      const { name, type, id } = user;
      const userForToken = { id, name, email, type };
      const token = jwt.sign(userForToken, JWT_SECRET);

      return res.header("token", token).status(200).json({
        result: sanitizeUser(user),
        token,
      });
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const dogsOfUser = (req, res) => {
  const { user } = req;
  const dogOfUser = "SELECT * FROM events_participants WHERE id_user = ?";
  try {
    conn.query(dogOfUser, [user.id], (err, result) => {
      if (err) return res.status(500).send(err);
      const data = result.filter((item, index, arr) => {
        return arr.findIndex((elem) => elem.registration_number === item.registration_number) === index;
      });
      return res.status(200).json({ result: data });
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const requestPassword = (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email requerido" });

  conn.query(ENSURE_PASSWORD_RESET_TABLE_SQL, (ensureErr) => {
    if (ensureErr) {
      console.error("[requestPassword] Error creando/verificando tabla password_reset_tokens:", ensureErr);
      return res.status(500).json({ message: "Error del servidor" });
    }

  const querySearchEmail = "SELECT * FROM users WHERE email = ?";
  conn.query(querySearchEmail, [email], (err, results) => {
    if (err) {
      console.error("[requestPassword] Error buscando usuario:", err);
      return res.status(500).json({ message: "Error del servidor" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "No se encontró un usuario con ese correo" });
    }

    const userID = results[0].id;
    const token = jwt.sign({ userID }, JWT_PASSWORD_RESET_SECRET, { expiresIn: "1h" });

    const querySaveToken = "INSERT INTO password_reset_tokens (token, user_id, status) VALUES (?,?,1)";
    conn.query(querySaveToken, [token, userID], (saveErr) => {
      if (saveErr) {
        console.error("[requestPassword] Error guardando token:", saveErr);
        return res.status(500).json({ message: "Error del servidor" });
      }

      sendRecoveryPasswordEmail({ to: email, token })
        .then((info) => {
          console.log("[requestPassword] Correo enviado:", info?.id || "ok");
          return res.status(200).json({ message: "Correo de recuperación enviado" });
        })
        .catch((errorMail) => {
          console.error("[requestPassword] Error enviando email:", errorMail);
          return res.status(500).json({ message: "No se pudo enviar el correo" });
        });
    });
  });
  });
};

const resetPasswordd = (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password || password.length < 6) {
    return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres" });
  }

  try {
    const payload = jwt.verify(token, JWT_PASSWORD_RESET_SECRET);
    const queryToken = "SELECT * FROM password_reset_tokens WHERE user_id = ? AND token = ? AND status = 1";

    conn.query(queryToken, [payload.userID, token], async (err, result) => {
      if (err) {
        return res.status(500).send("Error en el servidor");
      }

      if (!result.length) {
        return res.status(401).send("Token no válido o expirado");
      }

      const queryDisableTokens = "UPDATE password_reset_tokens SET status = 0 WHERE user_id = ? AND status = 1";
      const queryPassword = "UPDATE users SET password = ? WHERE id = ? AND status = 1";
      const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

      conn.query(queryDisableTokens, [payload.userID], (disableErr) => {
        if (disableErr) {
          return res.status(500).send(disableErr);
        }
        conn.query(queryPassword, [passwordHash, payload.userID], (updateErr) => {
          if (updateErr) {
            return res.status(500).send("Error interno del servidor");
          }
          return res.status(200).send("Contraseña actualizada");
        });
      });
    });
  } catch (_err) {
    return res.status(401).send("Token no válido o expirado");
  }
};

module.exports = {
  register,
  login,
  dogsOfUser,
  requestPassword,
  getUsers,
  resetPasswordd,
};
