import express from 'express';
import userControllers from './user.controllers.js';
import { verifyToken } from '../../middleware/verifyToken.js';
import { validateRegister } from '../../middleware/validateRegister.js';
import { registerSchema } from '../../../client/src/schemas/registerSchema.js';


const router = express.Router();

router.post('/login', userControllers.login);
router.get('/userById',verifyToken, userControllers.userById);
router.post("/register",validateRegister(registerSchema), userControllers.register);
router.get('/verify/:token', userControllers.verifyEmail);
router.get('/userById', userControllers.userById);
router.put('/editUser/:id', userControllers.editUserById);
router.post('/contact', userControllers.sendEmail);

export default router;
