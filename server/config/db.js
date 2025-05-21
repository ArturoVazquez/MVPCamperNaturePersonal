import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

export const dbPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dateStrings: true,
  // connectionLimit:10
});

//función encargada de abrir conexion, realizar petición y cerrar conexión
const executeQuery = async (sql, values = []) => {
  let connection;
  try {
    //abro conexión
    connection = await dbPool.getConnection();
    const [result] = await connection.query(sql, values);
    return result;
  } catch (error) {
    throw error;
  } finally {
    //libero o cierro la conexión
    if (connection) {
      connection.release();
    }
  }
};

export default executeQuery;
