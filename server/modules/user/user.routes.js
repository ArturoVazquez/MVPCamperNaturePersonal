import express from 'express';
import userControllers from './user.controllers.js';
const router = express.Router();

router.get('/', userControllers.hello);

export default router;
