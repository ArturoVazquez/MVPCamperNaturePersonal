import dotenv from 'dotenv';
import { sendContactEmail } from '../../utils/nodemailerUtils.js';

dotenv.config();
class UserControllers {
  sendEmail = async (req, res) => {
    const { name, email, message } = req.body;
    try {
      await sendContactEmail({ name, email, message });
      res.status(200).json({ message: 'Correo enviado correctamente' });
    } catch (error) {
      console.log('Error al enviar el correo:', error);
      res.status(500).json({ error: 'Error al enviar el correo' });
    }
  };
}

export default new UserControllers();
