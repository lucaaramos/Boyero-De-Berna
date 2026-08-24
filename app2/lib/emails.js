require('dotenv').config();

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL;

const verifyResendConfig = () => {
  if (!RESEND_API_KEY || !RESEND_FROM_EMAIL) {
    console.warn('[mail] RESEND_API_KEY/RESEND_FROM_EMAIL no configurados.');
    return false;
  }

  console.log('[mail] Resend configurado.');
  return true;
};

const sendRecoveryPasswordEmail = async ({ to, token }) => {
  const frontendUrl = process.env.FRONTEND_URL || process.env.REACT_APP_URI_CLIENT || process.env.URL;
  const restoreUrl = `${frontendUrl}/${token}/restore`;

  if (!RESEND_API_KEY || !RESEND_FROM_EMAIL) {
    throw new Error('Resend no configurado');
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: RESEND_FROM_EMAIL,
      to: [to],
      subject: 'Restablecimiento de Contraseña',
      text: `Haz clic en este enlace para restablecer tu contraseña: ${restoreUrl}`,
      html: `<p>Haz clic en este enlace para restablecer tu contraseña:</p><p><a href="${restoreUrl}">${restoreUrl}</a></p>`,
    }),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = payload?.message || payload?.error || `Error Resend (${response.status})`;
    throw new Error(message);
  }

  return payload;
};

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const sendContactEmail = async ({ name, email, phone, city, message }) => {
  if (!RESEND_API_KEY || !RESEND_FROM_EMAIL) {
    throw new Error('Resend no configurado');
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || RESEND_FROM_EMAIL;
  const safeName = escapeHtml(name);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: RESEND_FROM_EMAIL,
      to: [toEmail],
      reply_to: email,
      subject: `Consulta web de ${name}`,
      text: `Nombre: ${name}\nEmail: ${email}\nTeléfono: ${phone}\nCiudad: ${city}\n\nMensaje:\n${message}`,
      html: `<h2>Nueva consulta desde la web</h2><ul><li><b>Nombre:</b> ${safeName}</li><li><b>Email:</b> ${escapeHtml(email)}</li><li><b>Teléfono:</b> ${escapeHtml(phone)}</li><li><b>Ciudad:</b> ${escapeHtml(city)}</li></ul><p><b>Mensaje:</b></p><p>${safeMessage}</p>`,
    }),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = payload?.message || payload?.error || `Error Resend (${response.status})`;
    throw new Error(message);
  }

  return payload;
};

module.exports = {
  verifyResendConfig,
  sendRecoveryPasswordEmail,
  sendContactEmail,
};
