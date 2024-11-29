import db from "../db/db.js"

export const addReceptionistDetailModel = async (userId, qualification, experienceYears) => {
    try {
        const [result] = await db.query(
            "INSERT INTO receptionists (user_id, qualification, experience_years) VALUES (?, ?, ?)", 
            [userId, qualification, experienceYears]
        );
        return result;
    } catch (error) {
        throw new Error(`Error in adding receptionist details: ${error.message}`);
    }
};


export const getAllReceptionistModel=async()=>{
    try {
        const [result]=await db.query("select receptionists.*,users.first_name,users.middle_name,users.last_name,users.email,users.phone_number,users.gender,users.profile_url,users.date_of_birth,users.address from receptionists join users on receptionists.user_id=users.user_id")
        return result
    } catch (error) {
        throw new Error(`Error in getting receptionist Details ${error.message}`)
    }
}

export const getReceptionistByIdModel=async(receptionistId)=>{
    try {
        const [result]=await db.query("select receptionists.*,users.first_name,users.middle_name,users.last_name,users.email,users.phone_number,users.gender,users.profile_url,users.date_of_birth,users.address from receptionists join users on receptionists.user_id=users.user_id where receptionist_id=?",[receptionistId])
        return result
    } catch (error) {
        throw new Error(`Error in getting receptionist Details ${error.message}`)
    }
}

export const updateReceptionistModel=async(receptionistId,qualification,experienceYears)=>{
    try {
        const [result]=await db.query("update receptionists set qualification=?,experience_years=? where receptionist_id=?",[qualification,experienceYears,receptionistId])
        return result
    } catch (error) {
        throw new Error(`Error in updating receptionist Details ${error.message}`)
    }
}

