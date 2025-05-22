import { hashString } from '../../utils/hashUtils.js';
import dotenv from 'dotenv';
import { sendContactEmail } from '../../utils/nodemailerUtils.js';
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
  register = async(req, res) => {
        try {
            const {email, password} =req.body;
            //1 compobar que el email no exista
            let result = await userDal.findUserByEmail(email)
            console.log("result findUserByEmail", result);
            if(result.length){
                throw {message: "Este correo ya está registrado"}
            }else{
                const hashedPassword = await hashString(password);
                const data = { email, hashedPassword}
                await userDal.register(data)
                res.status(201).json({message:"Creado correctamente"})
            }
        } catch (error) {
            console.log(error);
            
            res.status(500).json(error)
        }
    }

  
  // Editar usuario por ID
  editUserById = async (req, res) => {
    const data = req.body;
   

    try {
      userDal.editUserById(req.body)
      res.status(200).json({message: "Editado satisfactoriamente"})
    } catch (error) {
      res.status(500).json({ error: "Error actualizando el usuario" });
    }
  };

  login = async (req, res) => {
    console.log(req.body);
    try {
      const {email, password} = req.body;
      const result = await userDal.findUserByEmailLogin(email);
      console.log(result);
      if (result.length === 0){
        res.status(401).json({message:"credenciales incorrectas"})
      } else {
        //Hay que hacer el compare de bycript
        if (password === result[0].password){
          const token = jwt.sign({user_id: result[0].user_id}, process.env.TOKEN_KEY, {expiresIn:'1d'});
          //console.log('tokenlogin', token)
          res.status(200).json({token});
        } else {
          res.status(401).json({message:"credenciales incorrectas"})
        }
        
      }
      
    } catch (error) {
      console.log('error loginController', error);
      res.status(500).json({message:"error 500"})
      //throw error
    }
    
  }

  userById = async (req, res) =>{
    
    res.status(200).json('ok');
  }
}

export default new UserControllers();