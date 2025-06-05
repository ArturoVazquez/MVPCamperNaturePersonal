/* eslint-disable no-useless-catch */
import { format } from 'mysql2';
import executeQuery from '../../config/db.js';
import { parseISO } from 'date-fns';

class AdminDal {
  // EDITAR SERVICIO

editService = async (data) => {
  const {
    name,
    price,
    description,
    max_total,
    service_id,
    service_img,
    is_included,
  } = data;

  try {
    const isIncludedInt = is_included === true || is_included === 'true' ? 0 : 1;

    let sql =
      'UPDATE service SET name=?, price=?, description=?, max_total=?, is_included=?, service_img=? WHERE service_id = ?';

    let values = [
      name,
      price,
      description,
      max_total,
      isIncludedInt,
      service_img,
      Number(service_id),
    ];

    await executeQuery(sql, values);
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
        values = [
          name,
          price,
          description,
          max_total,
          data.img.filename,
          is_included,
        ];
      }
      await executeQuery(sql, values);
    } catch (error) {
      throw error;
    }
  };

  getUserList = async () => {
    try {
      let sql =
        'SELECT user_id, name, lastname, email, phone,  document_type, document_number, is_disabled FROM user WHERE is_deleted = 0 AND user_type = 1 AND is_confirmed = 1 ORDER BY name ASC;';
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

  getBooking = async () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    try {
      /* let sql = 'SELECT booking.*, user.name, user.lastname, user.phone, user.prefix, user.car_brand FROM booking JOIN user on user.user_id = booking.user_id WHERE booking.start_date >= ? AND booking.status = 1 order by booking.start_date asc'; */
      let sql = `SELECT 
    booking.*,
    user.name,
    user.lastname,
    user.phone,
    user.prefix,
    user.car_brand,
    GROUP_CONCAT(CONCAT(service.name, ' (', booking_service.amount, ')') SEPARATOR ', ') AS services
      FROM booking
      JOIN user ON user.user_id = booking.user_id
      LEFT JOIN booking_service ON booking_service.booking_id = booking.booking_id
      LEFT JOIN service ON service.service_id = booking_service.service_id
      WHERE booking.start_date >= ?
        AND booking.status = 1
      GROUP BY booking.booking_id
      ORDER BY booking.start_date ASC`;
      let bookingReserve = await executeQuery(sql, today);
      console.log(bookingReserve);
      return bookingReserve;
    } catch (error) {
      console.error('error del getBooking del admindal', error);
      throw error;
    }
  };

  delReserve = async (booking_id) => {
    try {
      let sql = 'UPDATE booking SET status = 0 WHERE booking_id = ?';
      await executeQuery(sql, [booking_id]);
    } catch (error) {
      console.error('error delreserve admindal', error);
    }
  };

  getParcelId = async (selectedDates) => {
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
      console.error('error del getParcelId del daladmin');
      throw error;
    }
  };

  updateBookingReserve = async (
    parcel_id,
    booking_id,
    start_date,
    end_date,
    totalPrice
  ) => {
    try {
      let sql =
        'UPDATE booking SET parcel_id = ?, start_date = ?, end_date = ?, total = ? WHERE booking_id = ? AND status = 1';
      let values = [parcel_id, start_date, end_date, totalPrice, booking_id];
      await executeQuery(sql, values);
    } catch (error) {
      console.error('error del updateBookingReserve del admidal', error);
      throw error;
    }
  };

  updateBookingParcel = async (booking_id, parcel_id, totalDays) => {
    try {
      let deleteSql = 'DELETE FROM booking_parcel WHERE booking_id = ?';
      await executeQuery(deleteSql, [booking_id]);

      for (let i = 0; i < totalDays.length - 1; i++) {
        let insertSql =
          'INSERT INTO booking_parcel (booking_id, parcel_id, day) VALUES (?,?,?)';
        const fechaFormateada = format(parseISO(totalDays[i]), 'yyyy-MM-dd');
        let values = [booking_id, parcel_id, fechaFormateada];
        await executeQuery(insertSql, values);
      }
    } catch (error) {
      console.error('error del updateBookingParcel admidal', error);
      throw error;
    }
  };

  getBookingById = async (booking_id) => {
    try {
      console.log('booking del daladmin', booking_id);
      let sql =
        'SELECT booking.booking_id, booking.start_date, booking.end_date, booking.total AS total_reserva, IFNULL(SUM(service.price * booking_service.amount), 0) AS total_servicios_no_incluidos FROM booking LEFT JOIN booking_service ON booking.booking_id = booking_service.booking_id LEFT JOIN service ON booking_service.service_id = service.service_id AND service.is_included = 0 WHERE booking.booking_id = ? GROUP BY booking.booking_id, booking.start_date, booking.end_date, booking.total;';
      const priceTotal = await executeQuery(sql, booking_id);
      return priceTotal;
    } catch (error) {
      console.error('error del getBookigById del admidal', error);
      throw error;
    }
  };
}

export default new AdminDal();
