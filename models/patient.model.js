import db from "../db/db.js";

export const addPatientDetailModel=async(userId,fullName,date_of_birth,gender,address,emergency_contact,blood_group,allergies,medical_history,height,weight,bmi,glucose_level,bp_systolic,bp_diastolic,sugar_level)=>{
        // Convert `emergency_contact` object to JSON string
        const emergencyContactJson = JSON.stringify(emergency_contact);
        const allergiesJson = JSON.stringify(allergies);
        const medicalHistoryJson = JSON.stringify(medical_history);
    try {
        const [result]=await db.query("INSERT INTO patients (user_id,full_name,date_of_birth,gender,address,emergency_contact,blood_group,allergies,medical_history,height,weight,bmi,glucose_level,bp_systolic,bp_diastolic,sugar_level) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[userId,fullName,date_of_birth,gender,address,emergencyContactJson,blood_group,allergiesJson,medicalHistoryJson,height,weight,bmi,glucose_level,bp_systolic,bp_diastolic,sugar_level]);
        return result;
    } catch (error) {
        console.log(error)
        throw new Error(`Error in adding patient ${error.message}`);
    }
}

export const getPatientByIdModel=async(patientId)=>{
    try {
        const [result]=await db.query("SELECT patients.*,users.status,users.profile_url,users.email,users.phone_number FROM patients join users on patients.user_id=users.user_id WHERE patient_id = ?",[patientId]);
        return result;
    } catch (error) {
        throw new Error(`Error in getting patient ${error.message}`);
    }
}

export const getAllPatientModel=async()=>{
    try {
        const [result]=await db.query("SELECT patients.*,users.status,users.profile_url,users.email,users.phone_number FROM patients join users on patients.user_id=users.user_id");
        return result;
    } catch (error) {
        throw new Error(`Error in getting all patients ${error.message}`);
    }
}

export const updatePatientDetailModel=async(patientId,fullName,date_of_birth,gender,address,emergency_contact,blood_group,allergies,medical_history,height,weight,bmi,glucose_level,bp_systolic,bp_diastolic,sugar_level,status,profileUrl)=>{
    try {
        const [result]=await db.query("UPDATE patients join users on patients.user_id=users.user_id SET patients.full_name = ?,patients.date_of_birth = ?,patients.gender = ?,patients.address = ?,patients.emergency_contact = ?,patients.blood_group = ?,patients.allergies = ?,patients.medical_history = ?,patients.height = ?,patients.weight = ?,patients.bmi = ?,patients.glucose_level = ?,patients.bp_systolic = ?,patients.bp_diastolic = ?,patients.sugar_level = ?,users.status=?,users.profile_url=? WHERE patients.patient_id = ?",[fullName,date_of_birth,gender,address,emergency_contact,blood_group,allergies,medical_history,height,weight,bmi,glucose_level,bp_systolic,bp_diastolic,sugar_level,status,profileUrl,patientId]);
        return result;
    } catch (error) {
        throw new Error(`Error in updating patient ${error.message}`);
    }
}

export const getAllActivePatientModel=async()=>{
    try {
        const [result]=await db.query("SELECT patients.*,users.status,users.profile_url FROM patients join users on patients.user_id=users.user_id WHERE status = ?",['active']);
        return result;
    } catch (error) {
        throw new Error(`Error in getting all active patients ${error.message}`);
    }
}

export const deletePatientModel=async(patientId)=>{
    try {
        const [result]=await db.query("delete from patients where patient_id=?",[patientId])
        return result
    } catch (error) {
        throw new Error(`Error in deleting patient ${error.message}`);
    }
}

export const getPatientByUserIdModel=async(userId)=>{
    try {
        const [result]=await db.query("SELECT * FROM patients WHERE user_id = ?",[userId]);
        return result;
    } catch (error) {
        throw new Error(`Error in getting patient ${error.message}`);
    }
}

export const getUserByPatientIdModel=async(patientId)=>{
    try {
        const [result]=await db.query("select users.* from patients join users on patients.user_id=users.user_id where patient_id=?",[patientId])
        return result;
    } catch (error) {
        throw new Error(`Error in getting Users from patient Id ${error.message}`)
    }
}