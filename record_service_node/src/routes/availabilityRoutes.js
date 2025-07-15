import { 
    getAvailability,
    getDoctorInfoByPatient,
    updateAvailability,
    cancelAvailability,
    getDoctorInfo

 } from '../controller/appointmentController.js'

import express from 'express'
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router()

router.get('/availability', getAvailability);
router.get('/doctor', getDoctorInfo);
router.get('/patients/:patient_to_attend', authenticateToken, getDoctorInfoByPatient);
router.post('/booking', updateAvailability);
router.post('/cancel', cancelAvailability);



export default router;