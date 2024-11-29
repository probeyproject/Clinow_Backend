import express from "express";
import { createSpeciality,getAllSpeciality,getSpecialityById,updateSpeciality,deleteSpeciality } from "../controllers/specialtyModule/specialty.controller.js";
import upload from "../config/multer.js"

const router=express.Router();

router.post("/adminPanel/createSpecialty",upload.single('specialtyImage'),createSpeciality);
router.get("/adminPanel/getAllSpecialty",getAllSpeciality);
router.get("/adminPanel/getSpecialtyById/:id",getSpecialityById);
router.put("/adminPanel/updateSpecialty/:id",upload.single('specialtyImage'),updateSpeciality);
router.delete("/adminPanel/deleteSpecialty/:id",deleteSpeciality);

export default router;