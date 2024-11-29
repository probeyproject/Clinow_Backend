import express from "express"
import { addTransactionDetails, getAllTransaction, getTransactionByAppointmentId, getTransactionByDoctorId, getTransactionById, getTransactionByPatientId,updateTransactionStatus } from "../controllers/transactionModule/transaction.controller.js"

const router=express.Router()

router.get("/getAllTransaction",getAllTransaction)
router.post("/addTransactionDetail",addTransactionDetails)
router.get("/getTransactionById/:transactionId",getTransactionById)
router.get("/getTransactionByAppoinmentId/:appointmentId",getTransactionByAppointmentId)
router.get("/getTransactionByPatientId/:patientId",getTransactionByPatientId)
router.get("/getTransactionByDoctorId/:doctorId",getTransactionByDoctorId)
router.put("/updateStatus/:transactionId",updateTransactionStatus)


export default router;