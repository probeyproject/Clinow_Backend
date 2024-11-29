import db from "../db/db.js";

export const addAppointmentModel = async (doctorId, patientId, appointmentDate, startTime, endTime, consultationMode, reason,appointment_type) => {
    try {
        const result = await db.query(
            "INSERT INTO appointments (doctor_id, patient_id, appointment_date, start_time, end_time, consultation_mode, reason_for_visit,status,appointment_type) VALUES(?, ?, ?, ?, ?, ?, ?,?,?)",
            [doctorId, patientId, appointmentDate, startTime, endTime, consultationMode, reason,"booked",appointment_type]
        );
        return result;
    } catch (error) {
        throw new Error(`Error in adding appointment: ${error.message}`);
    }
}

export const getAllAppointmentModel = async () => {
    try {
        const [result] = await db.query("SELECT appointments.*, users.first_name, users.middle_name, users.last_name, users.profile_url, patients.full_name FROM appointments JOIN doctors ON appointments.doctor_id = doctors.doctor_id JOIN patients ON appointments.patient_id = patients.patient_id JOIN users ON doctors.user_id = users.user_id;")
        return result
    } catch (error) {
        throw new Error(`Error in getting appointment ${error.message}`)
    }
}

export const getAppointmentByIdModel = async (appointmentId) => {
    try {
        const [result] = await db.query("SELECT appointments.*, users.first_name, users.middle_name, users.last_name, users.profile_url, specialties.name, patients.full_name, patients.height, patients.weight, patients.gender FROM appointments JOIN doctors ON appointments.doctor_id = doctors.doctor_id JOIN patients ON appointments.patient_id = patients.patient_id join users ON doctors.user_id = users.user_id JOIN specialties ON doctors.specialty_id = specialties.specialty_id WHERE appointments.appointment_id =?", [appointmentId])
        return result
    } catch (error) {
        throw new Error(`Error in getting appointment ${error.message}`)
    }
}

export const updateAppointmentStatusModel = async (appointmentId, status) => {
    try {
        const [result] = await db.query("update appointments set status=? where appointment_id=?", [status, appointmentId])
        return result
    } catch (error) {
        throw new Error(`Error in updating appointment ${error.message}`)
    }
}

export const deleteAppointmentModel = async (appointmentId) => {
    try {
        const [result] = await db.query("delete from appointments where appointment_id=?", [appointmentId])
        return result
    } catch (error) {
        throw new Error(`Error in deleting appointment ${error.message}`)
    }
}

export const getAppointmentByPatientIdModel = async (patientId) => {
    
    try {
        const [result] = await db.query("SELECT appointments.*, users.first_name, users.middle_name, users.last_name, users.profile_url, specialties.name, patients.full_name, patients.height, patients.weight, patients.gender FROM appointments JOIN doctors ON appointments.doctor_id = doctors.doctor_id JOIN patients ON appointments.patient_id = patients.patient_id join users ON doctors.user_id = users.user_id JOIN specialties ON doctors.specialty_id = specialties.specialty_id WHERE appointments.patient_id =?",[patientId])
        return result
    } catch (error) {
        throw new Error(`Error in fetching appointment ${error.message}`)
    }
}

export const getAppointmentByDoctorIdModel = async (doctorId) => {
    try {
        const [result] = await db.query("SELECT appointments.*, users.first_name, users.middle_name, users.last_name, users.profile_url, patients.full_name FROM appointments JOIN doctors ON appointments.doctor_id = doctors.doctor_id JOIN patients ON appointments.patient_id = patients.patient_id JOIN users ON doctors.user_id = users.user_id where appointments.doctor_id=?", [doctorId])
        return result
    } catch (error) {
        throw new Error(`Error in fetching appoinment ${error.message}`)
    }
}

export const updateAppointmentDateAndTimeModel = async (appointmentId, appointmentDate, appointmentTime) => {
    try {
        const [result] = await db.query("update appointments set appointment_date=?,appointment_time=? where appointment_id=?", [appointmentDate, appointmentTime, appointmentId])
        return result
    } catch (error) {
        throw new Error(`Error in updating date and time ${error.message}`)
    }
}

export const getBookedAppointmentsByDoctorIdAndDateModel = async (doctorId, appointmentDate) => {
    try {
        const query = `
            SELECT start_time, end_time
            FROM appointments
            WHERE doctor_id = ?
            AND appointment_date = ?
            AND status = 'Booked'
        `;
        const [rows] = await db.query(query, [doctorId, appointmentDate]);
        return rows; 
    } catch (error) {
        throw new Error(`Error fetching booked appointments: ${error.message}`);
    }
};

export const getLastPaidAppoinmentByPatientIdModel = async (patientId) => {
    try {
        const [paidAppointment] = await db.query(
            "SELECT * FROM appointments WHERE patient_id = ? AND appointment_type IN ('online', 'cash') ORDER BY appointment_date DESC, start_time DESC LIMIT 1",
            [patientId]
        );
        if (paidAppointment && paidAppointment.length > 0) {
            paidAppointment[0].appointment_date = new Date(paidAppointment[0].appointment_date).toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
            return paidAppointment[0];
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        throw new Error(`Error in fetching last paid appointment: ${error.message}`);
    }
};
