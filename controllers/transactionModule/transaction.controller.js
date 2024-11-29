import { updateAppointmentDateAndTimeModel } from "../../models/appointments.model.js"
import { addTransactionModel, getAllTransactionModel, getTransactionByDoctorIdModel, getTransactionByIdModel, getTransactionByPatientIdModel, updateTransactionStatusModel } from "../../models/transaction.model.js"


export const addTransactionDetails=async(req,res)=>{
    const {appointmentId,patientId}=req.params
    const {amount,paymentMethod,transactionDetail}=req.body
    if(!appointmentId||!patientId){
        return res.status(400).json({message:"Ids not received"})
    }
    if(!amount||!paymentMethod||!transactionDetail){
        return res.status(400).json({message:"All fields required"})
    }
    try {
       const result=await addTransactionModel(appointmentId,patientId,amount,paymentMethod,transactionDetail)
        return res.status(200).json({message:"Transaction added successfully"})

    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const getAllTransaction=async(req,res)=>{
    try {
        
        const result= await getAllTransactionModel()
        return res.status(200).json({message:"Fetch successful",result})

    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const getTransactionById=async(req,res)=>{
    const transactionId=req.params.transactionId
    if(!transactionId){
        return res.status(400).json({message:"Id not received"})
    }
    try {
        const result=await getTransactionByIdModel(transactionId)
        return res.status(200).json({message:"fetch successful",result})

    } catch (error) {
        return res.status(500).json({message:error.message})
    }
    
}

export const updateTransactionStatus =async(req,res)=>{
    const transactionId=req.params.transactionId
    const {status}=req.body
    if(!transactionId){
        return res.status(400).json({message:"Id not received"})
    }
    try {
        const result=await updateTransactionStatusModel(transactionId,status)
        return res.status(200).json({message:"Status Updated"})
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const getTransactionByPatientId=async(req,res)=>{
    const patientId=req.params.patientId
    if(!patientId){
        return res.status(400).json({message})
    }
    try {
        const result=await getTransactionByPatientIdModel(patientId)
        return res.status(200).json({message:"fetch successful",result})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const getTransactionByAppointmentId=async(req,res)=>{
    const appointmentId=req.params.appointmentId
    if(!appointmentId){
        return res.status(400).json("Id not received")
    }
    try {
        const result=await getTransactionByAppointmentId(appointmentId)
        return res.status(200).json({message:"fetch successful"})
    } catch (error) {   
        return res.status(500).json({message:error.message})  
    }
}

export const getTransactionByDoctorId=async(req,res)=>{
    const doctorId=req.params.doctorId
    if(!doctorId){
        return res.status(400).json({message:error.message})
    }
    try {
        const result=await getTransactionByDoctorIdModel(doctorId)
        return res.status(200).json({message:"Fetch successful",result})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const updateAppointmentDateAndTime=async(req,res)=>{
    const appointmentId=req.params.appointmentId
    if(!appointmentId){
        return res.status(400).json({message:"Id is required"})
    }
    try {
        const result=await updateAppointmentDateAndTimeModel(appointmentId)
    } catch (error) {
        
    }    

}