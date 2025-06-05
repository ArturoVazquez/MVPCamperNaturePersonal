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
    html: `
    <div style="font-family: Arial, sans-serif; color: #333;">
    <h2 style="color: #2d8659;">Nuevo mensaje desde CamperNature</h2>
    <p><strong>Nombre:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Mensaje:</strong></p>
    <p style="white-space: pre-line;">${message}</p>
  </div>
           `,
  };

  await transporter.sendMail(mailOptions);
};

export const sendVerificationEmail = async (user) => {
  const token = jwt.sign(
    { user_id: user.user_id },
    process.env.VERIFY_TOKEN_KEY,
    {
      expiresIn: '1d',
    }
  );

  const verificationUrl = `${process.env.BACKEND_URL}/user/verify/${token}`;

  const mailOptions = {
    from: `"CamperNature" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: 'Confirma tu cuenta en CamperNature',
    html: `
       <div style="font-family: Arial, sans-serif; color: #333;">
    <h2 style="color: #2d8659;">¡Bienvenido a CamperNature!</h2>
    <p>Gracias por registrarte. Para activar tu cuenta, haz clic en el siguiente botón:</p>
    <p>
      <a href="${verificationUrl}" style="display: inline-block; padding: 10px 20px; background-color: #2d8659; color: #fff; text-decoration: none; border-radius: 5px;">
        Confirmar cuenta
      </a>
    </p>
    <p>O copia y pega este enlace en tu navegador:</p>
    <p><a href="${verificationUrl}">${verificationUrl}</a></p>
    <p>Este enlace expirará en 24 horas.</p>
  </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export const sendPasswordResetEmail = async ({ email, token }) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;

  const mailOptions = {
    from: `"CamperNature" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Restablece tu contraseña en CamperNature',
    html: `
     <div style="font-family: Arial, sans-serif; color: #333;">
    <h2 style="color: #2d8659;">Restablece tu contraseña</h2>
    <p>Recibimos una solicitud para cambiar tu contraseña. Si no fuiste tú, puedes ignorar este mensaje.</p>
    <p>Para crear una nueva contraseña, haz clic en el siguiente botón:</p>
    <p>
      <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #2d8659; color: #fff; text-decoration: none; border-radius: 5px;">
        Restablecer contraseña
      </a>
    </p>
    <p>O copia y pega este enlace en tu navegador:</p>
    <p><a href="${resetUrl}">${resetUrl}</a></p>
    <p>Este enlace es válido por 1 hora.</p>
  </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
