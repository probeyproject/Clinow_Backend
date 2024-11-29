import express from "express"

import {addDoctorAvailability,getDoctorAvailabilityByDoctorId,getAllDoctorAvailability,deleteDoctorAvailability, updateDoctorAvailability, getAvailabilityByDoctorIdAndDate,getAllAvailableSlotOFDoctor} from "../controllers/doctorAvailabilityModule/doctorAvailability.controller.js"

const router=express.Router()

router.post("/addDoctorAvailability/:doctorId",addDoctorAvailability)
router.get("/getDoctorAvailabilityByDoctorId/:doctorId",getDoctorAvailabilityByDoctorId)
router.get("/getAllDoctorAvailability",getAllDoctorAvailability)
router.delete("/deleteDoctorAvailability/:doctorAvailabilityId",deleteDoctorAvailability)
router.put("/updateDoctorAvailability",updateDoctorAvailability)
router.get("/doctorAvailability/date/:doctorId",getAvailabilityByDoctorIdAndDate)
router.get("/getAllAvailableSlot/:doctorId&:appointmentDate",getAllAvailableSlotOFDoctor)


export  default router