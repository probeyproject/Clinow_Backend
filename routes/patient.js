import express from "express"
import upload from "../config/multer.js"
import { addPatient, getAllActivePatient, getPatientById, updatePatient, getAllPatient,deletePatient } from "../controllers/patientModule/patient.controller.js"

const router=express.Router()

router.post("/addPatient/:id",addPatient)
router.get("/getAllPatient",getAllPatient)
router.get("/getPatientById/:patientId",getPatientById)
router.put("/updatePatient/:userId&:patientId",upload.single('profilePic'),updatePatient)
router.get("/getAllActivePatient",getAllActivePatient)
router.delete("/deletePatient/:patientId",deletePatient)

export default router