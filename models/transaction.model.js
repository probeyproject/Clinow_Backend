import db from "../db/db.js";

export const addTransactionModel=async(appointmentId,patientId,amount,paymentMethod,transactionDate)=>{
    try {
        const [result]=await db.query("insert into transactions (appointment_id,patient_id,amount,payment_method,transaction_date) values(?,?,?,?,?)",[appointmentId,patientId,amount,paymentMethod,transactionDate])
        return result
    } catch (error) {
        throw new Error(`Error in adding transaction ${error.message}`)
    }
}

export const getAllTransactionModel=async()=>{
    try {
        const [result]=await db.query("select * from transactions")
        return result
    } catch (error) {
        throw new Error(`Error in getting all transactions ${error.message}`)
    }
}

export const getTransactionByIdModel=async(transactionId)=>{
    try {
        const [result]=await db.query("select * from transactions where transaction_id=?",[transactionId])
        return result
    } catch (error) {
        throw new Error(`Error in getting transaction ${error.message}`)
    }
}

export const updateTransactionStatusModel=async(transactionId,status)=>{
    try {
        const [result]=await db.query("update transactions set status=? where transaction_id=?",[status,transactionId])
        return result
    } catch (error) {
        throw new Error(`Error in updating transaction status ${error.message}`)
    }
}

export const getTransactionByPatientIdModel=async(patientId)=>{
    try {
        const [result]=await db.query("select * from transactions where patient_id=?",[patientId])
        return result
    } catch (error) {
        throw new Error(`Error in getting transaction ${error.message}`)
    }
}

export const getTransactionByAppointmentIdModel=async(appointmentId)=>{
    try {
        const [result]=await db.query("select * from transactions where appointment_id=?",[appointmentId])
        return result
    } catch (error) {
        throw new Error(`Error in getting transaction ${error.message}`)
    }
}

export const getTransactionByDoctorIdModel=async(doctorId)=>{
    try {
        const [result]=await db.query("select transactions.*,appointments.doctor_id from transactions join appointments on transactions.appointment_id=appointments.appointment_id where doctor_id=?",[doctorId])
        return result

    } catch (error) {
        throw new Error(`Error in getting Transaction ${error.message}`)
    }
}