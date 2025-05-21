import express from 'express';
import UserControllers from './user.controllers.js';

const router = express.Router();

router.put('/editUser/:id', UserControllers.editUserById);

export default router;