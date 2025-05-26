import express from 'express';
import userControllers from './user.controllers.js';
import { verifyToken } from '../../middleware/verifyToken.js';
import { validateRegister } from '../../middleware/validateRegister.js';
import { validateLogin } from '../../middleware/validateLogin.js';
import { loginSchema } from '../../schemas/loginSchema.js';
import { registerSchema } from '../../schemas/registerSchema.js';
import { editUserSchema } from '../../schemas/editUserSchema.js';


const router = express.Router();

router.post('/login', validateLogin(loginSchema), userControllers.login);
router.get('/userById',verifyToken, userControllers.userById);
router.post("/register",validateRegister(registerSchema), userControllers.register);
router.get('/verify/:token', userControllers.verifyEmail);
router.put('/editUser', verifyToken, validateLogin(editUserSchema), userControllers.editUserById);
router.post('/contact', userControllers.sendEmail);
router.put('/delUser/:user_id', userControllers.delUser);


export default router;
