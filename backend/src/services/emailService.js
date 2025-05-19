import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: false, // true para 465, false para otros puertos
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendResetEmail(toEmail, token) {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;

  const mailOptions = {
    from: `"Lore Weaver" <${process.env.SMTP_USER}>`,
    to: toEmail,
    subject: 'Restablecer tu contraseña',
    html: `
      <p>Has solicitado restablecer tu contraseña.</p>
      <p>Haz click en el siguiente enlace para cambiarla:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>Este enlace expirará en 1 hora.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}
