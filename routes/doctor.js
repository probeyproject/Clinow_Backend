import express from 'express';
import upload from '../config/multer.js';
const router= express.Router();
import { addDoctor, getAllDoctor, getDoctorById,updateDoctor,deleteDoctor,getAllActiveDoctor } from '../controllers/doctorModule/doctor.controller.js';

router.post('/adminPanel/addDoctor/:id',addDoctor)
router.get('/getAllDoctor',getAllDoctor)
router.get('/getDoctorById/:doctorId',getDoctorById)
router.put('/adminPanel/updateDoctor/:doctorId',upload.single('profilePic'),updateDoctor)
router.delete('/adminPanel/deleteDoctor/:doctorId',deleteDoctor)
router.get('/getAllActiveDoctor',getAllActiveDoctor)
export default router;