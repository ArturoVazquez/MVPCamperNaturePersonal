import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendContactEmail = async ({ name, email, message }) => {
  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.EMAIL_USER,
    subject: 'Nuevo mensaje de contacto',
    text: message,
    html: `<p><strong>Nombre:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Mensaje:</strong><br/>${message}</p>`,
  };

  await transporter.sendMail(mailOptions);
};

export const sendVerificationEmail = async (user) => {
  const token = jwt.sign({ user_id: user.user_id }, process.env.TOKEN_KEY, {
    expiresIn: '1d',
  });

  const verificationUrl = `${process.env.BACKEND_URL}/user/verify/${token}`;

  const mailOptions = {
    from: `"CamperNature" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: 'Verifica tu cuenta en CamperNature',
    html: `
      <h3>Hola</h3>
      <p>Gracias por registrarte. Por favor haz clic en el siguiente enlace para confirmar tu cuenta:</p>
      <a href="${verificationUrl}">${verificationUrl}</a>
    `,
  };

  await transporter.sendMail(mailOptions);
};