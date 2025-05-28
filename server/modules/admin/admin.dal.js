import executeQuery from '../../config/db.js';

class AdminDal {
  // EDITAR SERVICIO

editService = async (data) => {
  console.log('DATAAAAA Y FILE', data);
  const { name, price, description, max_total, service_id, service_img, is_included } = data;
  console.log("MARCADOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOR",service_img)
  try {
      let sql =
        'UPDATE service SET name=?, price=?, description=?, max_total=?, is_included=?, service_img=? WHERE service_id = ?';
     let  values = [name, price, description, max_total, is_included, service_img, Number(service_id)];
    

    let res = await executeQuery(sql, values);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
  getServiceById = async (id) => {
    try {
      const sql = 'SELECT * FROM service WHERE service_id = ?';
      const result = await executeQuery(sql, [id]);
      return result;
    } catch (error) {
      throw error;
    }
  };

  createService = async (data) => {
    const { name, price, description, max_total, is_included } = data.data;
    try {
      let sql =
        'INSERT INTO service (name, price, description, max_total, is_included) VALUES (?,?,?,?,?)';
      let values = [name, price, description, max_total, is_included];
      if (data.img) {
        sql =
          'INSERT INTO service (name, price, description, max_total, service_img, is_included) VALUES (?,?,?,?,?,?)';
        values = [name, price, description, max_total,  data.img.filename, is_included];
      }
      await executeQuery(sql, values);
    } catch (error) {
      throw error;
    }
  };

  getUserList = async () => {
    try {
      let sql =
        'SELECT user_id, name, lastname, email, phone,  document_type, document_number, is_disabled FROM user WHERE is_deleted = 0   AND is_confirmed = 1 ORDER BY name ASC;';
      let res = await executeQuery(sql);
      return res;
    } catch (error) {
      throw error;
    }
  };

  disableUser = async (userId) => {
    try {
      let sql = 'UPDATE user SET is_disabled = 1 WHERE user_id = ?';
      await executeQuery(sql, [userId]);
    } catch (error) {
      throw error;
    }
  };

  enableUser = async (userId) => {
    try {
      let sql = 'UPDATE user SET is_disabled = 0 WHERE user_id = ?';
      await executeQuery(sql, [userId]);
    } catch (error) {
      throw error;
    }
  };

  allServices = async () => {
    try {
      let sql = 'SELECT * FROM service WHERE service_is_deleted = 0';
      const result = await executeQuery(sql);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  delService = async (service_id) => {
    try {
      let sql =
        'UPDATE service SET service_is_deleted = 1 WHERE service_id = ?';
      let result = await executeQuery(sql, [service_id]);
      console.log(result);
    } catch (error) {
      throw error;
    }
  };
}

export default new AdminDal();
