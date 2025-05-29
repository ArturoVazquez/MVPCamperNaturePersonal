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
        car_registration,
        car_brand,
      } = data;
      const sql = `
        UPDATE user 
        SET name = ?, lastname = ?, address = ?, prefix = ?, phone = ?, 
            birth_date = ?,  country = ?, 
            document_type = ?, document_number = ?, car_registration = ?, car_brand = ? 
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
        car_registration,
        car_brand,
        user_id,
      ];

      const result = await executeQuery(sql, values);
      console.log(result);
    } catch (error) {
      throw error;
    }
  };

  register = async (data) => {
    console.log(data);
    try {
      const { email, password } = data;
      let values = [email, password];
      let sql = 'INSERT INTO user (email, password) VALUES (?,?)';
      const result = await executeQuery(sql, values);
      return result; // contiene esto ell insertId
    } catch (error) {
      throw { message: 'error de bd' };
    }
  };

  findUserByEmail = async (email) => {
    try {
      let sql = 'SELECT user_id FROM user WHERE email = ?';
      let result = await executeQuery(sql, [email]);
      return result;
    } catch (error) {
      console.log('findUserByEmail', error);
      throw error;
    }
  };

  findUserByEmailLogin = async (email) => {
    try {
      let sql =
        'SELECT user_id, password FROM user WHERE email = ? AND is_deleted = 0 AND is_disabled = 0';
      let result = await executeQuery(sql, [email]);
      return result;
    } catch (error) {
      console.log('findUserByEmail', error);
      throw error;
    }
  };

  findUserById = async (user_id) => {
    try {
      let sql =
        'SELECT * FROM user WHERE user_id = ? AND is_deleted = 0 AND is_disabled = 0';
      const result = await executeQuery(sql, [user_id]);
      //console.log('result findUserById del dalll', result);
      return result[0];
    } catch (error) {
      console.log('error del findUserById del dal', error);
      throw error;
    }
  };

  confirmUser = async (user_id) => {
    try {
      const sql = 'UPDATE user SET is_confirmed = 1 WHERE user_id = ?';
      await executeQuery(sql, [user_id]);
    } catch (error) {
      console.log('Error en confirmUser DAL:', error);
      throw error;
    }
  };

  delUser = async (user_id) => {
    try {
      let sql = 'UPDATE user SET is_deleted = 1 WHERE user_id = ?';
      await executeQuery(sql, [user_id]);
    } catch (error) {}
  };

  updatePassword = async (user_id, hashedPassword) => {
    const sql = 'UPDATE user SET password = ? WHERE user_id = ?';
    await executeQuery(sql, [hashedPassword, user_id]);
  };

  checkDates = async (selectedDates) => {
    let sql =
      'select parcel_id from parcel where parcel_id NOT IN (select parcel_id from booking_parcel where 1 = 1 AND';

    let cont = 0;

    for (let date of selectedDates) {
      if (cont > 0) {
        sql += ' OR ';
      }

      sql +=
        " day = '" +
        date.getFullYear() +
        '-' +
        (date.getMonth() + 1) +
        '-' +
        date.getDate() +
        "'";

      cont++;
    }

    sql += ') order by parcel_id asc limit 1';

    const result = await executeQuery(sql)
    const parcelId = result[0].parcel_id;
    console.log(parcelId);
  };
}

export default new UserDal();
