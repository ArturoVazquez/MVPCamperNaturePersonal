import express from 'express';
import adminControllers from './admin.controllers.js';
import { uploadImage } from '../../middleware/multer.js';
import { verifyToken } from '../../middleware/verifyToken.js';

const router = express.Router();

router.put(
  '/editService/:id',
  verifyToken,
  uploadImage('service'),
  adminControllers.editService
);

router.get('/editService/:id',verifyToken,
   adminControllers.getServiceById);
router.post(
  '/createService',
  uploadImage('service'),
  adminControllers.createService
);
router.get('/allServices', adminControllers.allServices);
router.get('/getUserList', adminControllers.getUserList);
router.put('/disableUser/:userId', adminControllers.disableUser);
router.put('/enableUser/:userId', adminControllers.enableUser);
router.delete('/delService/:serviceId', adminControllers.delService);
router.get('/getBooking', adminControllers.getBooking);
router.delete('/delReserve', verifyToken,adminControllers.delReserve);
router.put('/updateReserve', verifyToken, adminControllers.updateReserve);
router.get('/getBookigById/:booking_id', verifyToken, adminControllers.getBookingById)

export default router;
