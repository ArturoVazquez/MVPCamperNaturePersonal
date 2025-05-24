import express from 'express';
import adminControllers from './admin.controllers.js';
import { uploadImage } from '../../middleware/multer.js';

const router = express.Router();

router.put(
  '/editService/:id',
  uploadImage('service'),
  adminControllers.editService
);
router.post(
  '/createService',
  uploadImage('service'),
  adminControllers.createService
);
router.get('/allServices', adminControllers.allServices);
router.get('/getUserList', adminControllers.getUserList);
router.put('/disableUser/:userId', adminControllers.disableUser);
router.put('/enableUser/:userId', adminControllers.enableUser);

export default router;
