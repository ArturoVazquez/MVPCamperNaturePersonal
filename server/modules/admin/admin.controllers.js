import userDal from '../user/user.dal.js';
import adminDal from './admin.dal.js';
import dotenv from "dotenv";

dotenv.config()

class AdminControllers {

  createService = async (req, res) =>{
    console.log(req.body.serviceData);
    
    try {
      const data = {
        data: JSON.parse(req.body.serviceData),
        img: req.file
      }
      await adminDal.createService(data)
      res.status(200).json({message: "Servicio agregado correctamente"})
    } catch (error) {
      res.status(500).json({message: "Ups!, error de inserción"})
      console.log("eeeeeeeeeeee",error);
      
      
    }
  }

}

export default new AdminControllers();