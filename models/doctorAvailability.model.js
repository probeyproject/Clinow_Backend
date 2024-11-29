import db from "../db/db.js";

export const createDoctorAvailabilityModel=async(doctorId,startTime,endTime,date,type)=>{
    try {
        const [result]=await db.query("insert into doctor_availability (doctor_id,start_time,end_time,date,type) values(?,?,?,?,?)",[doctorId,startTime,endTime,date,type])
        return result
    } catch (error) {
        throw new Error(`Error in creating doctor Availability ${error.message}`)
    }
}

export const getAllDoctorAvailabilityModel=async()=>{
    try {
        const [result]=await db.query("select doctor_availability.*,users.first_name,users.middle_name,users.last_name,specialties.name from doctor_availability join doctors on doctor_availability.doctor_id=doctors.doctor_id join users on doctors.user_id=users.user_id join specialties on doctors.specialty_id=specialties.specialty_id")
        return result
    } catch (error) {
        throw new Error(`Error in getting all doctor Availability ${error.message}`)
    }
}

export const getDoctorAvailabilityByDoctorIdModel=async(doctorId)=>{
    try {
        const [result]=await db.query("select doctor_availability.*,users.first_name,users.middle_name,users.last_name,specialties.name from doctor_availability join doctors on doctor_availability.doctor_id=doctors.doctor_id join users on doctors.user_id=users.user_id join specialties on doctors.specialty_id=specialties.specialty_id where doctor_id=?",[doctorId])
        return result
    } catch (error) {
        throw new Error(`Error in getting doctor Availability ${error.message}`)
    }
}

export const deleteDoctorAvailabilityByDoctorIdModel=async(doctorId)=>{
    try {
        const [result]=await db.query("delete from doctor_availability where doctor_id=?",[doctorId])
        return result
    } catch (error) {
        throw new Error(`Error in deleting doctor Availability ${error.message}`)
    }
}

export const updateDoctorAvailabilityModel=async(doctorAvailabilityId,startTime,endTime,type,date)=>{
    try {
        const [result]=await db.query("update doctor_availability set start_time=?,end_time=?,date=?,type=? where doctor_id=?",[startTime,endTime,date,type,doctorAvailabilityId])
        return result
    } catch (error) {
        throw new Error(`Error in updating doctor Availability ${error.message}`)
    }
}

export const getDoctorAvailabilityByDoctorIdAndDateModel=async(doctorId,date)=>{
    try {
        const [result]=await db.query("select doctor_availability.*,users.first_name,users.middle_name,users.last_name,specialties.name from doctor_availability join doctors on doctor_availability.doctor_id=doctors.doctor_id join users on doctors.user_id=users.user_id join specialties on doctors.specialty_id=specialties.specialty_id where doctor_availability.doctor_id=? AND date=?",[doctorId,date])
        return result
    } catch (error) {
        throw new Error(`Error in getting doctor Availability ${error.message}`)
    }
}



