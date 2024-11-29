import { addAppointmentModel, deleteAppointmentModel, getAllAppointmentModel, getAppointmentByDoctorIdModel, getAppointmentByIdModel, getAppointmentByPatientIdModel, getLastPaidAppoinmentByPatientIdModel, updateAppointmentDateAndTimeModel, updateAppointmentStatusModel } from "../../models/appointments.model.js"
import { getUserByPatientIdModel } from "../../models/patient.model.js"
import {getDoctorByIdModel} from "../../models/doctor.model.js"
import { addNotificationModel } from "../../models/notification.model.js"

export const addAppointment=async(req,res)=>{
    const {patientId,doctorId}=req.params
    const {appointmentDate,startTime,endTime,consultationMode,reason,appointment_type}=req.body
    
    if(!patientId||!doctorId){
        return res.status(400).json({message:"Id not received"})
    }
    if(!appointmentDate||!startTime||!endTime||!consultationMode||!reason){
        return res.status(400).json({message:"All fields required"})
    }
    try {   
        const [result]=await addAppointmentModel(doctorId,patientId,appointmentDate,startTime,endTime,consultationMode,reason,appointment_type)

        const user=await getUserByPatientIdModel(patientId)
        const doctor=await getDoctorByIdModel(doctorId)
        const doctorName=`${doctor[0].first_name} ${doctor[0].middle_name?doctor[0].middle_name:""} ${doctor[0].last_name}`
        const specialty=doctor[0].name
        const userId=user[0].user_id
        const username=`${user[0].first_name}${user[0].middle_name?user[0].middle_name:""}${user[0].last_name}`


        const message=`Your appointment of doctor ${doctorName}(${specialty}) on ${appointmentDate} slot ${startTime}-${endTime} has been booked successfully `

        const type='appointment'

        const notification= await addNotificationModel(userId,message,type)
        

        return res.status(201).json({message:"Appointment added successfully"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}


export const getAllAppointment = async(req,res)=>{
    try {
        const result = await getAllAppointmentModel()
        return res.status(200).json({message:"Appointment fetched successfully",result})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const getAppointmentById= async(req,res)=>{
    const appointmentId=req.params.appointmentId
    if(!appointmentId){
        return req.status(400).json({message:"Id not received"})
    }
    try {
        const result=await getAppointmentByIdModel(appointmentId)
        return res.status(200).json({message:"Fetch successful",result})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const updateStatus=async(req,res)=>{
    const appointmentId=req.params.appointmentId
    const {status}=req.body
    if(!appointmentId){
        return req.status(400).json({message:"Id not received"})
    }
    try {
        const result = await updateAppointmentStatusModel(appointmentId,status)
        if(result.affectedRows===0){
            return res.status(400).json({message:"Something went wrong"})
        }
        return res.status(200).json({message:"update successful"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const deleteAppoinment=async(req,res)=>{
    const appointmentId=req.params.appointmentId
    if(!appointmentId){
        return res.status(400).json({message:"Id not received"})
    }
    try {
        const result= await deleteAppointmentModel(appointmentId)
        return res.status(200).json({message:"delete appointment"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const getAppointmentByPatientId =async(req,res)=>{
    const patientId =req.params.patientId
    if(!patientId){
        return res.status(400).json({message:"Id not received"})
    }
    try {
        const result=await getAppointmentByPatientIdModel(patientId)
        return res.status(200).json({message:"Fetch successful",result})
    }catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const getAppointmentByDoctorId=async(req,res)=>{
    const doctorId=req.params.doctorId
    if(!doctorId){
        return res.status(400).json({message:"Id not received"})
    }
    try {
        const result=await getAppointmentByDoctorIdModel(doctorId)
        return res.status(200).json({message:"Fetch successful",result})
    }catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const updateAppointmentDateAndTime=async(req,res)=>{
    const appointmentId=req.params.appointmentId
    const {appointmentDate,appointmentTime}=req.body
    if(!appointmentId){
        return res.status(400).json({message:"Id not received"})
    }
    if(!appointmentDate||!appointmentTime){
        return res.status(400).json({message:"date and time required"})
    }
    try {
        const result=await updateAppointmentDateAndTimeModel(appointmentId,appointmentDate,appointmentTime)
        if(result.affectedRows===0){
            return res.status(400).json({message:"Something went wrong"})
        }
        return res.status(200).json({message:"update successful"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }

}

export const getLastPaidAppoinmentByPatientId=async(req,res)=>{
    const patientId=req.params.patientId
    try {
        const result=await getLastPaidAppoinmentByPatientIdModel(patientId)
        return res.status(200).json({message:"fetch successful",result})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}