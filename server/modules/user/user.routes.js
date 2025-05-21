import express from 'express';
import userControllers from './user.controllers.js';
const router = express.Router();

router.post('/contact', userControllers.sendEmail);

export default router;
