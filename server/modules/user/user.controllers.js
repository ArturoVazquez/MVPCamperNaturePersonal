import { compareString, hashString } from '../../utils/hashUtils.js';
import dotenv from 'dotenv';
import { sendContactEmail, sendVerificationEmail } from '../../utils/nodemailerUtils.js';
import userDal from './user.dal.js';
import jwt from 'jsonwebtoken';

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

  //registro
  register = async (req, res) => {
    try {
      const { email, password } = req.body;

      // Comprobar que el email no exista
      const result = await userDal.findUserByEmail(email);
      console.log('result findUserByEmail', result);
      if (result.length) {
        throw { message: 'Este correo ya está registrado' };
      }

      // hasheo contraseña
      const hashedPassword = await hashString(password);

      // 3 insertamos usuario en la bd
      const newUser = { email, password: hashedPassword };
      const insertResult = await userDal.register(newUser);

      // obtenemos id insertado
      const user_id = insertResult.insertId;

      // generamos token con el id
      const token = jwt.sign({ user_id }, process.env.TOKEN_KEY, {
        expiresIn: '1d',
      });
      // Enviar correo de confirmación
      await sendVerificationEmail({ user_id, email });

      // Enviar respuesta al cliente
      res.status(201).json({
        message: 'Usuario creado. Revisa tu correo para confirmar tu cuenta.',
      });
    } catch (error) {
      console.log('Error en register:', error);
      res.status(500).json(error);
    }
  };

  verifyEmail = async (req, res) => {
    try {
      const { token } = req.params;

      const decoded = jwt.verify(token, process.env.VERIFY_TOKEN_KEY);
      const user_id = decoded.user_id;

      if (!user_id) {
        throw new Error('Token inválido: user_id no presente');
      }

      await userDal.confirmUser(user_id);

      res.redirect(`${process.env.FRONTEND_URL}/verified`);
    } catch (error) {
      console.error('Error en verifyEmail:', error.message);
      res.redirect(`${process.env.FRONTEND_URL}/verified?error=1`);
    }
  };

  // Editar usuario por ID
  editUserById = async (req, res) => {
    const data = req.body;
    //const {id} = req.params;

    try {
      userDal.editUserById(data);
      res.status(200).json({ message: 'Editado satisfactoriamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error actualizando el usuario' });
    }
  };

  //login
  login = async (req, res) => {
    console.log(req.body);
    try {
      const { email, password } = req.body;
      const result = await userDal.findUserByEmailLogin(email);
      console.log(result);
      if (result.length === 0) {
        res.status(401).json({ message: 'credenciales incorrectas' });
      } else {
        
        let match = await compareString(password, result[0].password);

        if (!match) {
          res.status(401).json({ message: 'credenciales incorrectas' });
        } else {
          const token = jwt.sign(
            { user_id: result[0].user_id },
            process.env.TOKEN_KEY,
            { expiresIn: '1d' }
          );

          res.status(200).json({ token });
        }
      }
    } catch (error) {
      console.log('error loginController', error);
      res.status(500).json({ message: 'error 500' });
    }
  };
  //necesario para el login
  userById = async (req, res) => {
    try {
      const { user_id } = req;
      let userLogged = await userDal.findUserById(user_id);
      res.status(200).json({ userLogged });
    } catch (error) {
      console.log('error del userById', error);
      res.status(500).json({ message: 'error 500' });
    }
  };
 
  // eliminado lógico de un usuario en su perfil
  delUser = async (req,res) => {
    try {
      const {user_id} = req.params;
      await userDal.delUser(user_id);
      res.status(200).json("borrado ok")
    } catch (error) {
      console.log(error);
      res.status(500).json({message:"ups hay algún problema"})
    }
  }
}

export default new UserControllers();
