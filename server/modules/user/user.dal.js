import executeQuery from '../../config/db.js';

class UserDal {
  editUserById = async (data) => {
    try {
      const {
        user_id,
        name,
        lastname,
        address,
        prefix,
        phone,
        birth_date,
        country,
        document_type,
        document_number,
        car,
      } = data;
      const sql = `
        UPDATE user 
        SET name = ?, lastname = ?, address = ?, prefix = ?, phone = ?, 
            birth_date = ?,  country = ?, 
            document_type = ?, document_number = ?, car = ?
        WHERE user_id = ? AND is_deleted = 0 
      `;
      const values = [
        name,
        lastname,
        address,
        prefix,
        phone,
        birth_date,
        country,
        document_type,
        document_number,
        car,
        user_id,
      ];

      await executeQuery(sql, values);
    } catch (error) {
      throw error;
    }
  };
}

export default new UserDal();
