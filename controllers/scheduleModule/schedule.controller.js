import { createScheduleModel,updateScheduleByIdModel,getAllScheduleModel,getScheduleByDoctorIdModel,deleteScheduleByIdModel,getScheduleByDoctorIdAndDateModel,getAllDoctorScheduleByDateModel } from "../../models/schedules.model.js";


export const createSchedule=async(req,res)=>{
    const doctorId=req.params.doctorId
    const {startTime,endTime,slotDuration,daysOfWeek}=req.body
    try {
        const result=await createScheduleModel(doctorId,startTime,endTime,slotDuration,daysOfWeek)
        res.status(200).json({
            message:"Schedule Created Successfully",
            result
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error",
            error:error.message
        })
    }
}

export const getAllSchedule=async(req,res)=>{
    try {
        const result=await getAllScheduleModel()
        res.status(200).json({
            message:"All Schedule",
            result
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error",
            error:error.message
        })
    }
}

export const getScheduleByDoctorId=async(req,res)=>{
    const doctorId=req.params.doctorId
    try {
        const result=await getScheduleByDoctorIdModel(doctorId)
        res.status(200).json({
            message:"Schedule By Doctor Id",
            result
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error",
            error:error.message
        })
    }
}

export const updateScheduleById=async(req,res)=>{
    const scheduleId=req.params.scheduleId
    const {startTime,endTime,slotDuration,dayOfWeek}=req.body
    try {
        const result=await updateScheduleByIdModel(scheduleId,dayOfWeek,startTime,endTime,slotDuration)
        res.status(200).json({
            message:"Schedule Updated Successfully",
            result
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error",
            error:error.message
        })
    }
}

export const deleteScheduleById=async(req,res)=>{
    const scheduleId=req.params.scheduleId
    try {
        const result=await deleteScheduleByIdModel(scheduleId)
        res.status(200).json({
            message:"Schedule Deleted Successfully",
            result
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error",
            error:error.message
        })
    }
}

export const getScheduleByDoctorIdAndDate=async(req,res)=>{
    const doctorId=req.params.doctorId
    const {date}=req.query
    try {
        const result=await getScheduleByDoctorIdAndDateModel(doctorId,date)
        res.status(200).json({
            message:"Schedule By Doctor Id And Date",
            result
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error",
            error:error.message
        })
    }
}

export const getAllScheduleByDate=async(req,res)=>{
    const {date}=req.query
    try {
        const result=await getAllDoctorScheduleByDateModel(date)
        res.status(200).json({
            message:"All Schedule By Date",
            result
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error",
            error:error.message
        })
    }
}