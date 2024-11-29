import express from "express";
import { createSchedule,getAllSchedule,getScheduleByDoctorId,updateScheduleById,deleteScheduleById, getAllScheduleByDate, getScheduleByDoctorIdAndDate } from "../controllers/scheduleModule/schedule.controller.js";

const router=express.Router()

router.post("/createSchedule/:doctorId",createSchedule)
router.get("/getAllSchedule",getAllSchedule)
router.get("/getScheduleByDoctorId/:doctorId",getScheduleByDoctorId)
router.put("/updateScheduleById/:scheduleId",updateScheduleById)
router.delete("/deleteScheduleById/:scheduleId",deleteScheduleById)
router.get("/doctor/scheduleByDate",getAllScheduleByDate)
router.get("/doctor/scheduleByIdAndDate/:doctorId",getScheduleByDoctorIdAndDate)

export default router