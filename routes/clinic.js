import express from "express"
import upload from "../config/multer.js"
import { addClinic, deleteClinic, getClinicById, getClinics, updateClinic } from "../controllers/clinicModule/clinics.controller.js"

const router=express.Router()

router.post("/createClinic",upload.array('clinicImages'),addClinic)
router.get("/getClinics",getClinics)
router.get("/getClinicById/:clinicId",getClinicById)
router.put("/updateClinic/:clinicId",upload.array('clinicImages'),updateClinic)
router.delete("/deleteClinic/:clinicId",deleteClinic)

export default router
