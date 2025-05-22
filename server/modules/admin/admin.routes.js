import express from 'express';
import adminControllers from './admin.controllers.js';
import { uploadImage } from '../../middleware/multer.js';

const router = express.Router();

router.post('/createService',uploadImage("service"), adminControllers.createService)

export default router;