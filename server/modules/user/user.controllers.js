import userDal from './user.dal.js';


class UserControllers {
  // Ruta simple para comprobar que el servidor responde
  hello = (req, res) => {
    res.status(200).json('hello');
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