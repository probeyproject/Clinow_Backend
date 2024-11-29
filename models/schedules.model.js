import db from "../db/db.js"

export const createScheduleModel=async(doctorId,startTime,endTime,slotDuration,daysOfWeek)=>{
    try {
        const values = daysOfWeek.map(day => [doctorId, day, startTime, endTime, slotDuration]);
        const result = await db.query(`INSERT INTO schedules (doctor_id, day_of_week, start_time, end_time, slot_duration) VALUES ?`,[values])
        return result
    } catch (error) {
        throw new Error(`Error in Inserting Schedule ${error.message}`)
    }
}

export const getAllScheduleModel=async()=>{
    try {
        const [result] = await db.query("select schedules.*,users.first_name,users.middle_name,users.last_name,specialties.name from schedules join doctors on schedules.doctor_id=doctors.doctor_id join users on doctors.user_id=users.user_id join specialties on doctors.specialty_id=specialties.specialty_id")
        return result
    } catch (error) {
        throw new Error(`Error in getting All Schedule`)
    }
}

export const getScheduleByDoctorIdModel=async(doctorId)=>{
    try {
        
        const [result]=await db.query("select schedules.*,users.first_name,users.middle_name,users.last_name,specialties.name from schedules join doctors on schedules.doctor_id=doctors.doctor_id join users on doctors.user_id=users.user_id join specialties on doctors.specialty_id=specialties.specialty_id where schedules.doctor_id=?",[doctorId])
        return result
    } catch (error) {
        throw new Error(`Error in Fetching schedule ${error.message}`)
    }
}

export const updateScheduleByIdModel=async(scheduleId,dayOfWeek,startTime,endTime,slotDuration)=>{
   try {
    const [result]=await db.query("update schedules set day_of_week=?,start_time=?,end_time=?,slot_duration=? where schedule_id=? ",[dayOfWeek,startTime,endTime,slotDuration,scheduleId])
    return result
   } catch (error) {
    throw new Error(`Error in updating schedule ${error.message}`)
   }
}

export const deleteScheduleByIdModel=async(scheduleId)=>{
    try {
        const [result]=await db.query("delete from schedules where schedule_id=?",[scheduleId])
        return result
    } catch (error) {
        throw new Error(`Error in deleting schedule ${error.message}`)
    }
}

export const getScheduleByDoctorIdAndDateModel=async(doctorId,date)=>{
    try {
        const [result]=await db.query("select schedules.*,users.first_name,users.middle_name,users.last_name,specialties.name from schedules join doctors on schedules.doctor_id=doctors.doctor_id join users on doctors.user_id=users.user_id join specialties on doctors.specialty_id=specialties.specialty_id where schedules.doctor_id=? and schedules.day_of_week=DAYNAME( ? )",[doctorId,date])
        return result
    } catch (error) {
        throw new Error(`Error in fetching schedule ${error.message}`)
    }
}

export const getAllDoctorScheduleByDateModel=async(date)=>{
    try {
        const [result]=await db.query("select schedules.*,users.first_name,users.middle_name,users.last_name,specialties.name from schedules join doctors on schedules.doctor_id=doctors.doctor_id join users on doctors.user_id=users.user_id join specialties on doctors.specialty_id=specialties.specialty_id where schedules.day_of_week=DAYNAME( ? )",[date])
        return result
    } catch (error) {
        throw new Error(`Error in fetching schedule ${error.message}`)
    }
}