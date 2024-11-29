import db from "../db/db.js";
import { addNotificationModel } from "../models/notification.model.js";
import moment from "moment";
import { getUserByPatientIdModel } from "../models/patient.model.js";

export async function addNotificationsForNearAppointments() {
  try {
    const nearTimeFrame = 24;
    const now = moment();
    const nearTime = moment().add(nearTimeFrame, "hours");

    const currentDateTime = now.format("YYYY-MM-DD HH:mm:ss");
    const nearDateTime = nearTime.format("YYYY-MM-DD HH:mm:ss");
    const appointmentQuery = `
      SELECT appointment_id, patient_id, appointment_date, start_time,end_time
      FROM appointments 
      WHERE CONCAT(appointment_date, ' ', start_time) BETWEEN ? AND ?
    `;
    const [appointments] = await db.query(appointmentQuery, [
      currentDateTime,
      nearDateTime,
    ]);

    for (const appointment of appointments) {
      const appointmentDateTime = moment(
        `${appointment.appointment_date} ${appointment.start_time}`
      ).format("MMMM Do YYYY, h:mm:ss a");
      const users = await getUserByPatientIdModel(appointment.patient_id);
      const userId = users[0].user_id;
      
      const notificationMessage = `Your appointment is coming up on ${appointment.appointment_date} timing ${appointment.start_time}-${appointment.end_time}.`;

      const result = await addNotificationModel(
        userId,
        notificationMessage,
        "reminder"
      );
      console.log(
        `Notification sent to patient ${appointment.patient_id} for appointment ${appointment.appointment_id}.`
      );
    }
  } catch (err) {
    console.error("Error processing notifications:", err);
  }
}
