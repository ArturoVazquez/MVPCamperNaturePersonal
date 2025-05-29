import { compareString, hashString } from '../../utils/hashUtils.js';
import dotenv from 'dotenv';
import {
  sendContactEmail,
  sendPasswordResetEmail,
  sendVerificationEmail,
} from '../../utils/nodemailerUtils.js';
import userDal from './user.dal.js';
import jwt from 'jsonwebtoken';
import { parseISO, differenceInCalendarDays, addDays } from 'date-fns';

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
  delUser = async (req, res) => {
    try {
      const { user_id } = req.params;
      await userDal.delUser(user_id);
      res.status(200).json('borrado ok');
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'ups hay algún problema' });
    }
  };

  forgetPassword = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await userDal.findUserByEmail(email);

      if (!user.length) {
        return res.status(404).json({ message: 'Correo no registrado' });
      }

      const token = jwt.sign(
        { user_id: user[0].user_id, purpose: 'password-reset' },
        process.env.RESET_TOKEN_KEY,
        { expiresIn: '1h' }
      );

      await sendPasswordResetEmail({ email, token });

      res
        .status(200)
        .json({ message: 'Revisa tu correo para restablecer la contraseña' });
    } catch (error) {
      console.error('Error en forgetPassword:', error);
      res.status(500).json({ message: 'Error del servidor' });
    }
  };

  resetPassword = async (req, res) => {
    try {
      const { token } = req.params;
      const { newPassword } = req.body;

      const decoded = jwt.verify(token, process.env.RESET_TOKEN_KEY);

      if (decoded.purpose !== 'password-reset') {
        throw new Error('Token inválido');
      }

      const hashedPassword = await hashString(newPassword);
      await userDal.updatePassword(decoded.user_id, hashedPassword);

      res.status(200).json({ message: 'Contraseña actualizada correctamente' });
    } catch (error) {
      console.error('Error en resetPassword:', error);
      res.status(400).json({ message: 'Token inválido o expirado' });
    }
  };

  // checkDates = async (req, res) => {
  //   const { start_date, end_date } = req.body;
  //   function diasEntreFechas(start_date, end_date) {
  //     const f1 = new Date(start_date);
  //     const f2 = new Date(end_date);
  //     const diferenciaMs = Math.abs(f2 - f1);
  //     const dias = Math.ceil(diferenciaMs / (1000 * 60 * 60 * 24)); // +1 para incluir el último día
  //     return dias;
  //   }
  //   const numDias = diasEntreFechas(start_date, end_date);
  //   let everyDateSelected = new Date(start_date);
  //   let selectedDates = [];
  //   for (let i = 0; i < numDias; i++) {
  //     selectedDates.push(new Date(everyDateSelected)); // clonar la fecha
  //     everyDateSelected.setDate(everyDateSelected.getDate()+1); // avanzar un día
  //     console.log('holaaaaaa',everyDateSelected)
  //     console.log('adiosss', selectedDates)
  //   }
  //   console.log('selectedDates', selectedDates)
  //   // const result = await userDal.checkDates(selectedDates);
  //   //console.log('result de las datas', result);
  // };

  checkDates = async (req, res) => {
    const {start_date, end_date} = req.body;
    const f1 = parseISO(start_date);
    const f2 = parseISO(end_date);
    const numDias = differenceInCalendarDays(f2, f1);
    let selectedDates = [];
    for (let i = 0; i < numDias; i++) {
      selectedDates.push(addDays(f1,i))
      
    }

    const result = await userDal.checkDates(selectedDates)
    
  }
}

export default new UserControllers();
