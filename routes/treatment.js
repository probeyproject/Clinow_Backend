import express from "express";
import upload from "../config/multer.js";
import { addTreatment, deleteTreatment, getAllActiveTreatment, getAllTreatment, getTreatmentById, updateTreatment } from "../controllers/treamentsModule/treatments.controller.js";

const router=express.Router()

router.post('/addTreatment',upload.single('treatmentImage'),addTreatment)
router.get('/getTreatments',getAllTreatment)
router.get('/getTreatmentById/:treatmentId',getTreatmentById)
router.get('/getActiveTreatment',getAllActiveTreatment)
router.put('/updateTreatment/:treatmentId',upload.single('treatmentImage'),updateTreatment)
router.delete('/deleteTreatment/:treatmentId',deleteTreatment)

export default router