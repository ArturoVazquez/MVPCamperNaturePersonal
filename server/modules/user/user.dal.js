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

  register = async (data) => {
        console.log(data);
        try {
            const {hashedPassword, email} = data;
            let values = [email, hashedPassword]
            let sql = "INSERT INTO user (email, password) VALUES (?,?)" 
            await executeQuery(sql, values);
        } catch (error) {
            throw {message: "error de bd"}
        } 
    }

   findUserByEmail = async(email) =>{
        try {
            let sql = 'SELECT user_id FROM user WHERE email = ?';
            let result = await executeQuery(sql, [email]);
            return result;
        } catch (error) {
          console.log('findUserByEmail', error);
            throw error;
        }
    }

  findUserByEmailLogin = async(email) =>{
    try {
      let sql = 'SELECT user_id, password FROM user WHERE email = ? AND is_deleted = 0 AND is_disabled = 0';
      let result = await executeQuery(sql, [email]);
      return result;
    } catch (error) {
      console.log('findUserByEmail', error)
      throw error;
    }
  }

  findUserById = async (user_id) =>{
    try {
      let sql = 'SELECT * FROM user WHERE user_id = ? AND is_deleted = 0 AND is_disabled = 0';
      const result = await executeQuery(sql, [user_id]);
      //console.log('result findUserById del dalll', result);
      return result[0];
    } catch (error) {
      console.log('error del findUserById del dal', error)
      throw error
    }
  }
}

export default new UserDal();
