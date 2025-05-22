import executeQuery from "../../config/db.js";

class AdminDal{

   // EDITAR SERVICIO

   editService= async(data, file) =>{
     console.log("DATAAAAA Y FILE", data, file)
      const { name, price, description, max_total, service_id} = data;
      try{
        let sql= "UPDATE service SET name=?, price=?, description=?, max_total=? WHERE service_id = ?";
        let values= [name, price, description, max_total, service_id]
        if(file){
          sql ="UPDATE service SET name=?, price=?, description=?, max_total=?, service_img=?  WHERE service_id = ?"
          values=[name, price, description, max_total, file.filename, service_id]
        }

      
   
        let res = await executeQuery(sql, values)

      }catch(error){
        console.log(error)
             throw(error)
      }
      
    }

   }



export default new AdminDal();