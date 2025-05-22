import adminDal from "./admin.dal.js"
import dotenv from "dotenv"

dotenv.config();

class AdminControllers{
  /* EDITAR SERVICIO */
  editService= async(req,res) =>{
       let id = req.params.id
       let data = {...req.body, service_id:id}
    try{
     await adminDal.editService(data, req.file) 
     console.log("ID RECIBIDO por el ADMIN CONTROLLER", req.params.id)
     console.log("BODY RECIBIDO por el ADMIN CONTROLLER", req.body);
     



      res.status(200).json({message: "Servicio editado correctamente"})
    }catch( error) { 
      console.log(error)

      res.status(500).json({message:"Problema en editar servicio"})
     
    }
  }

 showEditService = async (req, res) =>{
    
    res.status(200).json('ok');
  }
}

export default new AdminControllers();