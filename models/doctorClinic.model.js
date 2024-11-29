import db from "../db/db.js";

export const addDoctorClinicModel = async (doctorId, clinicIds) => {
    const values = clinicIds.map(clinicId => [doctorId, clinicId]);
  
    const query = `
      INSERT INTO doctor_clinics (doctor_id, clinic_id)
      VALUES ?`;
  
    try {
      const [result] = await db.query(query, [values]);
      return result;
    } catch (error) {
      console.error('Error inserting doctor and clinics:', error);
      throw error;
    }
  };
  
  export const getDoctorClinicModelByDoctorId = async (doctorId) => {
    const query = `
SELECT doctor_clinics.*,clinics.clinic_name,clinics.address,clinics.img_urls,users.first_name,users.last_name,users.middle_name,users.profile_url FROM doctor_clinics join clinics on doctor_clinics.clinic_id = clinics.clinic_id join doctors on doctors.doctor_id = doctor_clinics.doctor_id join users on doctors.user_id=users.user_id WHERE doctor_clinics.doctor_id = ?`;

    try {
      const [result] = await db.query(query, [doctorId]);
      return result;
    } catch (error) {
      console.error('Error fetching doctor clinics:', error);
      throw error;
    }
  };

  export const deleteDoctorClinicModel = async (id) => {
    const query = `
      DELETE FROM doctor_clinics
      WHERE id = ?`;

    try {
      const [result] = await db.query(query, [id]);
      return result;
    } catch (error) {
      console.error('Error deleting doctor clinics:', error);
      throw error;
    }
  };

  export const getDoctorClinicByClinicIdModel = async (clinicId) => {
    const query = `
SELECT doctor_clinics.*,clinics.clinic_name,clinics.address,clinics.img_urls,users.first_name,users.last_name,users.middle_name,users.profile_url FROM doctor_clinics join clinics on doctor_clinics.clinic_id = clinics.clinic_id join doctors on doctors.doctor_id = doctor_clinics.doctor_id join users on doctors.user_id=users.user_id WHERE doctor_clinics.clinic_id = ?`;
      try {
      const [result] = await db.query(query, [clinicId]);
      return result;
    } catch (error) {
      console.error('Error fetching doctor clinics by clinic ID:', error);
      throw error;
    }
  };

export const getDoctorClinicModel=async()=>{
  try {

    const [result]=await db.query("SELECT doctor_clinics.*,clinics.clinic_name,clinics.address,clinics.img_urls,users.first_name,users.last_name,users.middle_name,users.profile_url,specialties.name FROM doctor_clinics join clinics on doctor_clinics.clinic_id = clinics.clinic_id join doctors on doctors.doctor_id = doctor_clinics.doctor_id join users on doctors.user_id=users.user_id join specialties on doctors.specialty_id=specialties.specialty_id")
    return result
  } catch (error) {
    console.error('Error fetching doctor clinics:', error);
    throw new Error(`Error in getting All Doctor Clinic ${error.message}`)
  }
}