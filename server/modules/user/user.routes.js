import express from 'express';
import userControllers from './user.controllers.js';
import { verifyToken } from '../../middleware/verifyToken.js';
import { validateSchema } from '../../middleware/validateSchema.js';
import { registerSchema } from '../../schemas/registerSchema.js';
import { validateForgetPassword } from '../../middleware/validateForgetPassword.js';
import { forgetPasswordSchema } from '../../schemas/forgetPasswordSchema.js';
import { changePasswordSchema } from '../../schemas/changePasswordSchema.js';
import { editUserSchema } from '../../schemas/editUserSchema.js';
import { loginSchema } from '../../schemas/loginSchema.js';

const router = express.Router();

router.post('/login', validateSchema(loginSchema), userControllers.login);
router.get('/userById', verifyToken, userControllers.userById);
router.post(
  '/register',
  validateSchema(registerSchema),
  userControllers.register
);
router.get('/verify/:token', userControllers.verifyEmail);
router.put(
  '/editUser',
  verifyToken,
  validateSchema(editUserSchema),
  userControllers.editUserById
);
router.post('/contact', userControllers.sendEmail);
router.put('/delUser/:user_id', userControllers.delUser);
router.post(
  '/forget-password',
  validateForgetPassword(forgetPasswordSchema),
  userControllers.forgetPassword
);
router.post(
  '/reset-password/:token',
  validateForgetPassword(changePasswordSchema),
  userControllers.resetPassword
);
router.post('/checkDates', verifyToken, userControllers.checkDates);
router.get('/getService', verifyToken, userControllers.getService);
router.post('/reserveDone', verifyToken, userControllers.reserveDone);
router.get('/getReserveUser', verifyToken, userControllers.getReserveUser);
router.post(
  '/getReserveService',
  verifyToken,
  userControllers.getReserveService
);
router.put('/reserveDelete', verifyToken, userControllers.reserveDelete);

export default router;
