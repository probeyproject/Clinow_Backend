import express from "express"
import { payment, paymentVerification } from "../controllers/razorPayModule/razorPay.controller.js"

const router= express.Router()

router.post('/create-order',payment)
router.post('/verify-payment',paymentVerification)

export default router