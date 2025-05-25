import express from 'express';
import userControllers from './user.controllers.js';
import { verifyToken } from '../../middleware/verifyToken.js';
import { validateRegister } from '../../middleware/validateRegister.js';
import { validateLogin } from '../../middleware/validateLogin.js';
import { loginSchema } from '../../schemas/loginSchema.js';
import { registerSchema } from '../../schemas/registerSchema.js';


const router = express.Router();

router.post('/login', validateLogin(loginSchema), userControllers.login);
router.get('/userById',verifyToken, userControllers.userById);
router.post("/register",validateRegister(registerSchema), userControllers.register);
router.get('/verify/:token', userControllers.verifyEmail);
router.get('/userById', userControllers.userById);
router.put('/editUser/:id', userControllers.editUserById);
router.post('/contact', userControllers.sendEmail);
router.put('/delUser/:user_id', userControllers.delUser);
router.post('/forgot-password', userControllers.forgotPassword);
router.post('/reset-password', userControllers.resetPassword);



export default router;
