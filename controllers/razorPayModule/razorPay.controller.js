import Razorpay from "razorpay";
import CryptoJS from 'crypto-js';
import db from "../../db/db.js"
import { addAppointmentModel } from "../../models/appointments.model.js";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


export const payment=async(req,res)=>{
    const { amount } = req.body;
    const amountInPaise = amount * 100;
    const options = {
        amount: amountInPaise,
        currency: "INR",
        receipt: "receipt#1",
        payment_capture: 1,
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
}



export const paymentVerification = async (req, res) => {
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        amount,
        payment_method,
        patientId,doctorId,
        appointmentDate,startTime,endTime,consultationMode,reason,appointment_type
    } = req.body;
    
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = CryptoJS.HmacSHA256(body, process.env.RAZORPAY_KEY_SECRET).toString(CryptoJS.enc.Hex);
    const isSignatureValid = expectedSignature === razorpay_signature;

    if (!isSignatureValid) {
        return res.status(400).json({ status: 'failure', message: 'Payment verification failed' });
    }

    try {
        const [appointmentResults] =await addAppointmentModel(doctorId,patientId,appointmentDate,startTime,endTime,consultationMode,reason,appointment_type)
        
        const appointment_id = appointmentResults.insertId; 
    
        await db.query(
            'INSERT INTO transactions (appointment_id,patient_id,amount,payment_method,status) VALUES (?,?,?,?,?)',
            [appointment_id, patientId, amount, payment_method, 'completed']
        );
        
        return res.json({
            status: 'success',
            message: 'Payment verified, appointment booked, and transaction saved.',
            appointmentId: appointment_id
        });
    } catch (err) {
        return res.status(500).json({ status: 'failure', message: 'An error occurred. Please try again later.' });
    }
};





