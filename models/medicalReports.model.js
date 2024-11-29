import db from "../db/db.js";

export const addMedicalReportModel = async (patientId, reportType, uploadedFiles, symptoms, notes, testDate, hospitalName) => {
    try {
      const uploadedFilesJson = JSON.stringify(uploadedFiles); // Convert files array to JSON string
      const symptomsJson = JSON.stringify(symptoms); // Convert symptoms array to JSON string

      // Corrected SQL query
      const [result] = await db.query(
        "INSERT INTO medical_reports (patient_id, report_type, file_path, symptoms, notes, hospital_name, test_date) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [patientId, reportType, uploadedFilesJson, symptomsJson, notes,hospitalName,testDate]
      );
  
      return result;
    } catch (error) {
      throw new Error(`Error in adding Medical Report: ${error.message}`);
    }
  };

export const getAllMedicalReport=async()=>{
    try {
        const [result]=await db.query("select * from medical_reports")
        return result
    } catch (error) {
        throw new Error(`Error in fetching Medical Reports ${error.message}`)
    }
}

export const getMedicalReportById = async(reportId)=>{
        try {
            const [result]=await db.query("select * from medical_reports where report_id=?",[reportId])
            return result
        } catch (error) {
            throw new Error(`Error in fetching Medical Reports ${error.message}`)
        }

}

export const updateMedicalReport=async(reportId,reportType,symptoms,updatedFiles,notes,hospitalName,testDate)=>{
    try {
        const [result]=await db.query("update medical_reports set report_type=?,file_path=?,symptoms=?,notes=?,hospital_name=?,test_date=? where report_id=?",[reportType,updatedFiles,symptoms,notes,hospitalName,testDate,reportId])
        return result
    } catch (error) {
        throw new Error(`Error in updating Medical Reports ${error.message}`)
    }

}

export const getMedicalReportsByPatientId=async(patientId)=>{
    try {
        const [result]=await db.query("select * from medical_reports where patient_id=?",[patientId])
        return result
    } catch (error) {
        throw new Error(`Error in fetching medical reports`)
    }
}

export const deleteMedicalReportModel=async(reportId)=>{
    try {
        const [result]=await db.query("delete from medical_reports where report_id=?",[reportId])
        return result
    } catch (error) {
        throw new Error(`Error in deleting medical reports`)
    }
}