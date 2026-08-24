const { sendContactEmail } = require("../lib/emails");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const sendContact = async (req, res) => {
  const { name, email, message, city, numberPhone } = req.body || {};

  if (!name?.trim() || !email?.trim() || !message?.trim() || !city?.trim() || !numberPhone?.trim()) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  if (!EMAIL_REGEX.test(email.trim())) {
    return res.status(400).json({ error: "Email inválido" });
  }

  if (message.trim().length > 5000) {
    return res.status(400).json({ error: "El mensaje es demasiado largo" });
  }

  try {
    await sendContactEmail({
      name: name.trim(),
      email: email.trim(),
      phone: numberPhone.trim(),
      city: city.trim(),
      message: message.trim(),
    });

    return res.status(200).json({ ok: true, message: "Mensaje enviado con éxito" });
  } catch (error) {
    console.error("[contact] Error al enviar el correo:", error.message);
    return res.status(500).json({ error: "No se pudo enviar el mensaje. Intenta nuevamente." });
  }
};

module.exports = { sendContact };
