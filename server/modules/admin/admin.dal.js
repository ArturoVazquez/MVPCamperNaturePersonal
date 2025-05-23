import executeQuery from '../../config/db.js';

class AdminDal {
  // EDITAR SERVICIO

  editService = async (data, file) => {
    console.log('DATAAAAA Y FILE', data, file);
    const { name, price, description, max_total, service_id } = data;
    try {
      let sql =
        'UPDATE service SET name=?, price=?, description=?, max_total=? WHERE service_id = ?';
      let values = [name, price, description, max_total, service_id];
      if (file) {
        sql =
          'UPDATE service SET name=?, price=?, description=?, max_total=?, service_img=?  WHERE service_id = ?';
        values = [
          name,
          price,
          description,
          max_total,
          file.filename,
          service_id,
        ];
      }
      let res = await executeQuery(sql, values);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  createService = async (data) => {
    const { name, price, description, max_total } = data.data;
    try {
      let sql =
        'INSERT INTO service (name, price, description, max_total) VALUES (?,?,?,?)';
      let values = [name, price, description, max_total];
      if (data.img) {
        sql =
          'INSERT INTO service (name, price, description, max_total, service_img) VALUES (?,?,?,?,?)';
        values = [name, price, description, max_total, data.img.filename];
      }
      await executeQuery(sql, values);
    } catch (error) {
      throw error;
    }
  };

  getUserList = async () => {
    try {
      let sql =
        'SELECT user_id, name, lastname, email, phone,  document_type, document_number FROM user WHERE is_deleted = 0   AND is_confirmed = 1 ORDER BY name ASC;';
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

  allServices = async () => {
    try {
      let sql = 'SELECT * FROM service';
      const result = await executeQuery(sql);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

}

export default new AdminDal();
