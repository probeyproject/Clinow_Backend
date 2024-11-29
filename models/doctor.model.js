import db from "../db/db.js"

export const addDoctorModel=async(userId,specialtyId,degree,field,availability,description,fee,followUpDays,year,detail)=>{
  try {
      const [result]=await db.query("Insert into doctors (user_id,specialty_id,qualification_degree,qualification_field,availability_schedule,consultation_fee,description,follow_up_day,experience_year,experience_details) values(?,?,?,?,?,?,?,?,?,?)",[userId,specialtyId,degree,field,availability,fee,description,followUpDays,year,detail])

      return result
  } catch (error) {
    console.log(error)
      throw new Error(`Error in adding doctor ${error.message}`)
  }

}

export const getAllDoctorModel=async()=>{
  try {
      const [result]=await db.query("select doctors.*,specialties.name,specialties.description,users.* from doctors join specialties on doctors.specialty_id = specialties.specialty_id join users on doctors.user_id=users.user_id")
      return result
  } catch (error) {
      throw new Error(`Error in getting doctor ${error.message}`)
  }
}

export const getDoctorByIdModel=async(doctorId)=>{
  try {
      const [result]=await db.query("select doctors.*,specialties.name,specialties.description,users.* from doctors join specialties on doctors.specialty_id = specialties.specialty_id join users on doctors.user_id=users.user_id where doctor_id=?",[doctorId])
      return result
  } catch (error) {
      throw new Error(`Error in getting doctor ${error.message}`)
  }
}

export const updateDoctorModel=async(firstName,middleName,lastName,email,phone,gender,degree,field,availability,fee,description,userId,doctorId,profileUrl,status,followUpDays,year,detail)=>{
  
  try {
      const [result]=await db.query("update doctors join users on doctors.user_id=users.user_id set users.first_name=?,users.middle_name=?,users.last_name=?,users.email=?,users.phone_number=?,users.gender=?,users.profile_url=?,users.status=?,doctors.qualification_degree=?,doctors.qualification_field=?,doctors.availability_schedule=?,doctors.consultation_fee=?,doctors.description=?,doctors.follow_up_day=?,experience_year=?,experience_details=? where doctors.doctor_id=?",[firstName,middleName,lastName,email,phone,gender,profileUrl,status,degree,field,availability,fee,description,followUpDays,year,detail,doctorId])
      return result
  } catch (error) {
      throw new Error(`Error in updating doctor ${error.message}`)
  }
}

export const deleteDoctorModel=async(doctorId)=>{
  try {
      const [result]=await db.query("delete from doctors where doctor_id=?",[doctorId])
      return result
  } catch (error) {
      throw new Error(`Error in deleting doctor ${error.message}`)
  }
}

export const getAllActiveDoctorModel=async()=>{
  try {
      const [result]=await db.query("select doctors.*,specialties.name,specialties.description,users.* from doctors join specialties on doctors.specialty_id = specialties.specialty_id join users on doctors.user_id=users.user_id where status='active'")
      return result
  } catch (error) {
      throw new Error(`Error in getting doctor ${error.message}`)
  }
}

export const getDoctorByUserId=async(userId)=>{
  try {
    const [result]=await db.query("select * from doctors where user_id=?",[userId])
    return result
  } catch (error) {
   throw new Error(`error in fetching doctors`) 
  }
}