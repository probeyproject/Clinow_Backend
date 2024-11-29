import express from "express"
import { addClinicFeature, deleteClinicFeature, getAllClinicFeature, getClinicFeatureById, updateClinicFeature } from "../controllers/clinicFeatureModule/clinicFeature.controller.js"
import upload from "../config/multer.js"
const router=express.Router()

router.post("/addClinicFeature",upload.single("clinicImage"),addClinicFeature)
router.get("/getClinicFeature",getAllClinicFeature)
router.get("/getClinicFeature/:id",getClinicFeatureById)
router.put("/updateClinicFeature/:id",upload.single("clinicImage"),updateClinicFeature)
router.delete("/deleteClinicFeature/:id",deleteClinicFeature)

export default router