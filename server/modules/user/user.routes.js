import express from 'express';
import userControllers from './user.controllers.js';
const router = express.Router();


// http://localhost:4000/user/login
router.post('/login', userControllers.login);
// http://localhost:4000/user/login
router.get('/userById', userControllers.userById)
export default router;
