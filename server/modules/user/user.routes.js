import express from 'express';
import userControllers from './user.controllers.js';
import { verifyToken } from '../../middleware/verifyToken.js';

const router = express.Router();

router.post('/login', userControllers.login);
router.get('/userById',verifyToken, userControllers.userById);
router.put('/editUser/:id', userControllers.editUserById);
router.post('/contact', userControllers.sendEmail);

export default router;
