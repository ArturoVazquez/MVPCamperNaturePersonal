import dotenv from 'dotenv';
class UserControllers {
  hello = (req, res) => {
    res.status(200).json('hello');
  };
}

export default new UserControllers();
