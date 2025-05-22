import express from 'express';
import adminControllers from './admin.controllers.js';
import { uploadImage } from '../../middleware/multer.js';

const router = express.Router();

router.put('/editService/:id', uploadImage("service"), adminControllers.editService);
router.get('/showEditService', adminControllers.showEditService);

export default router;