import db from "../db/db.js";

export const addUserModel = async (
  firstName,
  middleName,
  lastName,
  email,
  phone,
  gender,
  roleId,
  imageUrl,
  hashPassword,
  date_of_birth,
  address
) => {
  try {
    const [result] = await db.query(
      "INSERT INTO users (first_name,middle_name,last_name,email,phone_number,gender,role_id,profile_url,password,date_of_birth,address) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
      [firstName, middleName, lastName, email, phone, gender, roleId,imageUrl,hashPassword,date_of_birth,address]
    );
    return result;
  } catch (error) {
    throw new Error(`Error in adding user ${error.message}`);
  }
};

export const getUsersModel = async () => {
  try {
    const [result] = await db.query("select users.*,roles.role_name from users join roles on users.role_id = roles.role_id");
    return result;
  } catch (error) {
    throw new Error(`Error in getting users ${error.message}`);
  }
};

export const getUserByIdModel = async (userId) => {
  try {
    const [result] = await db.query("select users.*,roles.role_name from users join roles on users.role_id = roles.role_id where user_id = ?", [userId]);
    return result;
  } catch (error) {
    throw new Error(`Error in getting user by ID ${error.message}`);
  }
};

export const updateUserModel = async (userId,firstName,middleName,lastName,email,phone,gender,role_id,profileUrl,date_of_birth,address) => {
  try {
    const [result] = await db.query("UPDATE users SET first_name = ?,middle_name = ?,last_name = ?,email = ?,phone_number = ?,gender = ?,role_id = ?,profile_url=?,date_of_birth=?,address=? WHERE user_id = ?", [firstName,middleName,lastName,email,phone,gender,role_id,profileUrl,date_of_birth,address, userId]);
    return result;
  } catch (error) {
    throw new Error(`Error in updating user role ${error.message}`);
  }
};

export const deleteUserModel = async (userId) => {

  try {
    const [result] = await db.query("DELETE FROM users WHERE user_id = ?", [userId]);
    return result;
  } catch (error) {
    throw new Error(`Error in deleting user ${error.message}`);
  }
};

export const updatePasswordModel = async(userId,hashPassword)=>{
  try {
    const [result] = await db.query("UPDATE users SET password = ? WHERE user_id = ?", [hashPassword,userId]);
    return result;
  } catch (error) {
    throw new Error(`Error in updating user password ${error.message}`);
  }
}

export const getUserByEmailModel = async(email)=>{
  try {
    const [result] = await db.query("select users.*,roles.role_name from users join roles on users.role_id = roles.role_id where email=?",[email])
    return result
  } catch (error) {
    throw new Error(`Error in getting user by email ${error.message}`)
  }
}


export const insertResetModel = async (resetToken,resetExpiry,userId) =>{
  try{
      const result =await db.query("Update users set reset_token=$1,reset_token_expiry=$2 where id=$3",[resetToken,resetExpiry,userId])
      return(result)
  }catch(error){
      throw new Error(`Error in Inserting reset token by Email: ${error.message}`);
  }
}

export const updateStatusModel=async(userId,status)=>{
  try {
    const [result] = await db.query("UPDATE users SET status = ? WHERE user_id = ?", [status,userId]);
    return result;
  } catch (error) {
    throw new Error(`Error in updating user status ${error.message}`);
  }
}

export const getAllUserWithoutPatientModel=async()=>{
  try {
      const [result]=await db.query("select users.*,roles.role_name from users join roles on users.role_id = roles.role_id where users.role_id !='4' ")
      return result
  } catch (error) {
    throw new Error(`Error in updating user status ${error.message}`);
  }
}

export const getReceptionistModel=async()=>{
  try {
      const [result]=await db.query("select users.*,roles.name from users join roles on users.role_id = roles.role_id where users.role_id ='4' ")
      return result
  } catch (error) {
    throw new Error(`Error in updating user status ${error.message}`);
  }
}