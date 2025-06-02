import executeQuery from '../../config/db.js';
import { parseISO, format } from 'date-fns';

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
    try {
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

      const result = await executeQuery(sql);

      const parcelId = result[0].parcel_id;

      return parcelId;
    } catch (error) {
      throw error;
    }
  };

  getService = async () => {
    try {
      let sql = 'SELECT * FROM service';
      let result = await executeQuery(sql);
      return result;
    } catch (error) {
      console.error('getservice del dal error', error);
      throw error;
    }
  };

  reserveBooking = async (reservaData, price, parcelId, user_id) => {
    try {
      let sql =
        'INSERT INTO booking (user_id, parcel_id, preferences, start_date, end_date, total) VALUES (?,?,?,?,?,?)';
      const values = [
        user_id,
        parcelId,
        reservaData.preferences,
        reservaData.startDate,
        reservaData.endDate,
        price,
      ];
      const result = await executeQuery(sql, values);
      return result.insertId;
    } catch (error) {
      console.error('reserveDone del dal error', error);
      throw error;
    }
  };

  reserveBookingParcel = async (reserveBooking, parcelId, days) => {
    try {
      for (let i = 0; i < days.length; i++) {
        let sql =
          'INSERT INTO booking_parcel (booking_id, parcel_id, day) VALUES (?,?,?)';
        const fechaFormateada = format(parseISO(days[i]), 'yyyy-MM-dd');
        const values = [reserveBooking, parcelId, fechaFormateada];
        console.log('dayssssss', days[i]);
        await executeQuery(sql, values);
      }
    } catch (error) {
      console.error('error del reserveBookingParcel', error);
      throw error;
    }
  };

  reserveBookingService = async (reserveBooking, serviceNoIncluded) => {
    try {
      for (let i = 0; i < serviceNoIncluded.length; i++) {
        let sql =
          'INSERT INTO booking_service (booking_id, service_id, amount) VALUES (?,?,?)';
        const values = [
          reserveBooking,
          serviceNoIncluded[i].service_id,
          serviceNoIncluded[i].amount,
        ];
        console.log('servicesssssssss', serviceNoIncluded[i]);
        await executeQuery(sql, values);
      }
    } catch (error) {
      console.error('error del reserveBookingService', error);
      throw error;
    }
  };

  getReserveUser = async (user_id) => {
    try {
      let sql = 'SELECT * FROM Booking WHERE user_id = ? and status = 1';
      let result = await executeQuery(sql, [user_id]);
      return result;
    } catch (error) {
      throw error;
    }
  };

  getReserveService = async (booking_id) => {
    try {
      let sql =
        'SELECT s.name FROM booking_service bs JOIN service s ON bs.service_id = s.service_id WHERE bs.booking_id = ? AND is_included = 1;';
      let result = await executeQuery(sql, [booking_id]);
      return result;
    } catch (error) {
      throw error;
    }
  };
  reserveDelete = async (booking_id) => {
    try {
      let sql = 'UPDATE booking SET status = 0 WHERE booking_id = ?';
      await executeQuery(sql, [booking_id]);
    } catch (error) {
      throw error;
    }
  };
}

export default new UserDal();
