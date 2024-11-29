import express from "express";
import { addReceptionist, getAllReceptionist, getReceptionistById, updateReceptionist } from "../controllers/receptionistModule/receptionist.controller.js";
const router=express.Router()


router.post("/addReceptionist/:userId",addReceptionist)
router.get("/getReceptionist",getAllReceptionist)
router.get("/getReceptionistById/:id",getReceptionistById)
router.put("/updateReceptionist/:id",updateReceptionist)



export default router