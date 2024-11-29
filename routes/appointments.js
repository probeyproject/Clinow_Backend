import express from "express"
import { addAppointment, getAllAppointment, getAppointmentByDoctorId, getAppointmentById, getAppointmentByPatientId, deleteAppoinment, updateStatus, getLastPaidAppoinmentByPatientId } from "../controllers/appoinmentModule/appointment.controller.js"

const router=express.Router()

router.post("/addAppointment/:patientId&:doctorId",addAppointment)
router.get("/getAllAppointment",getAllAppointment)
router.get("/getAppointmentById",getAppointmentById)
router.get("/getAppointmentByPatientId/:patientId",getAppointmentByPatientId)
router.get("/getAppointmentByDoctorId/:doctorId",getAppointmentByDoctorId)
router.delete("/deleteAppointment/:appointmentId",deleteAppoinment)
router.put("/updateStatusAppointment/:appointmentId",updateStatus)
router.get("/getLastPaidAppointment/:patientId",getLastPaidAppoinmentByPatientId)


export default router

