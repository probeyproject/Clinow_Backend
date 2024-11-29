import express from "express";
import { addDoctorClinic, deletedoctorClinicById, getDoctorClinic, getDoctorClinicByClinicId, getDoctorClinicByDoctorId } from "../controllers/doctorClinicModule/doctorClinic.js";



const router = express.Router();

router.post("/addDoctorClinic", addDoctorClinic);
router.get("/getDoctorClinic", getDoctorClinic);
router.get("/getDoctorClinicByDoctorId/:doctorId",getDoctorClinicByDoctorId);
router.get("/getDoctorClinicByClinicId/:clinicId",getDoctorClinicByClinicId);
router.delete("/deleteDoctorClinic/:id",deletedoctorClinicById)



export default router;
