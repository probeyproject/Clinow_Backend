import express from "express"
import { addReports, deleteReportById, getAllReports, getReportById, getReportByPatientId, updateReportById, } from "../controllers/medical_records/medicalReports.controller.js"
import upload from "../config/multer.js"

const router = express.Router()

router.post("/addMedicalReport/:patientId",upload.array("files"),addReports)
router.get("/getAllReports",getAllReports)
router.get("/getReportById/:reportId",getReportById)
router.get("/getReportByPatientId/:patientId",getReportByPatientId)
router.put("/updateMedicalReport/:reportId",upload.array("files"),updateReportById)
router.delete("/deleteMedicalReport/:reportId",deleteReportById)

export default router