import dotenv from 'dotenv';
import userDal from './user.dal.js';
import jwt from 'jsonwebtoken';

dotenv.config();
class UserControllers {
 

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
