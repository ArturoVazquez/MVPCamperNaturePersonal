import executeQuery from "../../config/db.js";

class AdminDal {
  createService = async(data)  =>{
    const {name, price, description, max_total} = data.data;

    try {
      let sql = 'INSERT INTO service (name, price, description, max_total) VALUES (?,?,?,?)'
      let values = [name, price, description, max_total]
      if(data.img) {
        sql = 'INSERT INTO service (name, price, description, max_total, service_img) VALUES (?,?,?,?,?)'
        values = [name, price, description, max_total, data.img.filename]
      }
       await executeQuery(sql, values)
    } catch (error) {
      throw error;
      
    }
  }
}

export default new AdminDal();