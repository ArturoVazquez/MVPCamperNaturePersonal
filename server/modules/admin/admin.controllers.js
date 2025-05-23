import userDal from '../user/user.dal.js';
import adminDal from './admin.dal.js';
import dotenv from 'dotenv';

dotenv.config();

class AdminControllers {
  /* EDITAR SERVICIO */
  editService = async (req, res) => {
    let id = req.params.id;
    let data = { ...req.body, service_id: id };
    try {
      await adminDal.editService(data, req.file);
      console.log('ID RECIBIDO por el ADMIN CONTROLLER', req.params.id);
      console.log('BODY RECIBIDO por el ADMIN CONTROLLER', req.body);

      res.status(200).json({ message: 'Servicio editado correctamente' });
    } catch (error) {
      console.log(error);

      res.status(500).json({ message: 'Problema en editar servicio' });
    }
  };

  createService = async (req, res) => {
    console.log(req.body.serviceData);

    try {
      const data = {
        data: JSON.parse(req.body.serviceData),
        img: req.file,
      };
      await adminDal.createService(data);
      res.status(200).json({ message: 'Servicio agregado correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Ups!, error de inserción' });
      console.log('eeeeeeeeeeee', error);
    }
  };

  getUserList = async (req, res) => {
    try {
      const users = await adminDal.getUserList();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error del servidor' });
    }
  };

  disableUser = async (req, res) => {
    const { userId } = req.params;
    try {
      await adminDal.disableUser(userId);
    } catch (error) {
      res.status(500).json({ message: 'Error en el back' });
    }
  };
}

export default new AdminControllers();
