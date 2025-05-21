
import dotenv from 'dotenv';
import { sendContactEmail } from '../../utils/nodemailerUtils.js';
import userDal from './user.dal.js';
    
    
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

  
  // Editar usuario por ID
  editUserById = async (req, res) => {
    const data = req.body;
    console.log("aaaaaaaa", req.body)

    try {
      userDal.editUserById(req.body)
      res.status(200).json({message: "Editado satisfactoriamente"})
    } catch (error) {
      res.status(500).json({ error: "Error actualizando el usuario" });
    }
  };
}

export default new UserControllers();