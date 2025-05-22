import executeQuery from '../../config/db.js';

class UserDal {
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
}
export default new UserDal();
