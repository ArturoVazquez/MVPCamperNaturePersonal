import adminDal from './admin.dal.js';
import dotenv from 'dotenv';


dotenv.config();

class AdminControllers {
  /* EDITAR SERVICIO */
editService = async (req, res) => {
  const id = req.params.id;

  try {
    const data = JSON.parse(req.body.service_data);

    const body = {
      ...data,
      service_id: id,
    };

   console.log("EL CONSOLE DEL FILE", req.file)
    if (req.file) {
      body.service_img = req.file.filename; 
    }

    console.log('Datos recibidos del front:', body);

    await adminDal.editService(body);

    res.status(200).json({
      message: 'Servicio editado correctamente',
    });
  } catch (error) {
    console.error('Error al editar servicio:', error);
    res.status(500).json({ message: 'Problema en editar servicio' });
  }
};

 getServiceById = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await adminDal.getServiceById(id);

    if (service.length === 0) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }

    res.status(200).json(service[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al obtener el servicio' });
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

  allServices = async (req, res) => {
    try {
      let result = await adminDal.allServices();
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'ups, error al obtener los servicios' });
    }
  };

  disableUser = async (req, res) => {
    const { userId } = req.params;
    try {
      await adminDal.disableUser(userId);
      res.status(200).json({ message: 'Usuario deshabilitado correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error en el back' });
    }
  };

  enableUser = async (req, res) => {
    const { userId } = req.params;
    try {
      await adminDal.enableUser(userId);
      res.status(200).json({ message: 'Usuario habilitado correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error en el back' });
    }
  };

  delService = async(req, res) => {
    try {
      const {serviceId} = req.params;
      console.log(req.params);
      
      await adminDal.delService(serviceId);
      res.status(200).json("borrado ok")
    } catch (error) {
      console.log(error);

      res.status(500).json({message:"ups hay algún problema"})
    }
  }
}

export default new AdminControllers();
