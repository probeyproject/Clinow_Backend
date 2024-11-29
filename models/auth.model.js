import db from "../db/db.js";

export const signupModel=async(firstName,middleName,lastName,email,hashPassword,profileUrl,phone,gender)=>{
  const role_id=4
  try {
      const [result]= await db.query("Insert into users (first_name,middle_name,last_name,email,password,profile_url,phone_number,gender,role_id) values(?,?,?,?,?,?,?,?,?) returning user_id",[firstName,middleName,lastName,email,hashPassword,profileUrl,phone,gender,role_id])
      return result
  } catch (error) {
      throw new Error(`Error in Signup ${error.message}`)
  }
}

export const userExistModel=async(email)=>{
  try {
      const [result] =await db.query("select users.*,roles.role_name from users join roles on users.role_id = roles.role_id where email=?",[email])
      return result
  } catch (error) {
      throw new Error(`Error in getting user by email ${error.message}`)
  }
}

export const userExistModelByPhone=async(phone)=>{
  try {
      const [result] =await db.query("select users.*,roles.role_name from users join roles on users.role_id = roles.role_id where phone_number=?",[phone])
      return result
  } catch (error) {
      throw new Error(`Error in getting user by phone ${error.message}`)
  }
}
