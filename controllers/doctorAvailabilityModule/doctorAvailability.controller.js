import { createDoctorAvailabilityModel,getAllDoctorAvailabilityModel,getDoctorAvailabilityByDoctorIdModel,deleteDoctorAvailabilityByDoctorIdModel,updateDoctorAvailabilityModel,getDoctorAvailabilityByDoctorIdAndDateModel } from "../../models/doctorAvailability.model.js";
import { getScheduleByDoctorIdAndDateModel } from "../../models/schedules.model.js";
import {getBookedAppointmentsByDoctorIdAndDateModel} from "../../models/appointments.model.js"

export const addDoctorAvailability=async(req,res)=>{
    const doctorId=req.params.doctorId
    const {startTime,endTime,type,date}=req.body
    try {
        const result=await createDoctorAvailabilityModel(doctorId,startTime,endTime,date,type)
        res.status(201).json({message:"Doctor Availability added successfully",data:result})
    } catch (error) {
        res.status(500).json({message:"Error in adding doctor Availability",error:error.message})
    }
}

export const getDoctorAvailabilityByDoctorId=async(req,res)=>{
    const doctorId=req.params.doctorId
    try {
        const result=await getDoctorAvailabilityByDoctorIdModel(doctorId)
        res.status(200).json({
            message:"Doctor Availability By Doctor Id",
            result
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error",
            error:error.message
        })
    }
}

export const getAllDoctorAvailability=async(req,res)=>{
    try {
        const result=await getAllDoctorAvailabilityModel()
        res.status(200).json({
            message:"All Doctor Availability",
            result
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error",
            error:error.message
        })
    }
}

export const updateDoctorAvailability=async(req,res)=>{
    const doctorAvailabilityId=req.params.doctorAvailabilityId
    const {startTime,endTime,type,date}=req.body
    try {
        const result=await updateDoctorAvailabilityModel(doctorAvailabilityId,startTime,endTime,type,date)
        res.status(200).json({
            message:"Doctor Availability Updated Successfully",
            result
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error",
            error:error.message
        })
    }
}

export const deleteDoctorAvailability=async(req,res)=>{
    const doctorAvailabilityId=req.params.doctorAvailabilityId
    try {
        const result=await deleteDoctorAvailabilityByDoctorIdModel(doctorAvailabilityId)
        res.status(200).json({
            message:"Doctor Availability Deleted Successfully",
            result
        })
    }catch (error) {
        res.status(500).json({
            message:"Internal Server Error",
            error:error.message
        })
    }
}

export const getAvailabilityByDoctorIdAndDate=async(req,res)=>{
    const doctorId=req.params.doctorId
    const {date}=req.query
    
    try {
        const result=await getDoctorAvailabilityByDoctorIdAndDateModel(doctorId,date)
        res.status(200).json({
            message:"Doctor Availability fetch Successfully",
            result
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error",
            error:error.message
        })
    }
}


export const getAllAvailableSlotOFDoctor = async (req, res) => {
    const { doctorId, appointmentDate } = req.params;

    try {
        const schedules = await getScheduleByDoctorIdAndDateModel(doctorId, appointmentDate);
        const availability = await getDoctorAvailabilityByDoctorIdAndDateModel(doctorId, appointmentDate);
        
        const bookedAppointments = await getBookedAppointmentsByDoctorIdAndDateModel(doctorId, appointmentDate);
        
        const availableSlots = processAvailability(schedules, availability, bookedAppointments);
       return res.status(200).json({availableSlots,bookedAppointments});
    } catch (error) {
      
       return res.status(500).json({ message: error.message });
    }
}

export function processAvailability(scheduleResults, availabilityResults, bookedAppointments) {
    let availableSlots = [];

      const bookedSlots = bookedAppointments.map(appointment => {
        const startTime = new Date(`1970-01-01T${appointment.start_time}`).getTime();
        const endTime = new Date(`1970-01-01T${appointment.end_time}`).getTime();
        return { startTime, endTime };
    });

      let scheduleMap = scheduleResults.reduce((acc, schedule) => {
        if (!acc[schedule.day_of_week]) {
            acc[schedule.day_of_week] = [];
        }
        acc[schedule.day_of_week].push({
            startTime: new Date(`1970-01-01T${schedule.start_time}`).getTime(),
            endTime: new Date(`1970-01-01T${schedule.end_time}`).getTime(),
            slotDuration: schedule.slot_duration
        });
        return acc;
    }, {});

    

        availabilityResults.forEach(availability => {
        const dayOfWeek = new Date(availability.date).toLocaleDateString('en-US', { weekday: 'long' });
     
        if (availability.type === 'Full Leave') {
            delete scheduleMap[dayOfWeek];
        } else if (availability.type === 'Half Day') {
            const leaveStart = new Date(`1970-01-01T${availability.start_time}`).getTime();
            const leaveEnd = new Date(`1970-01-01T${availability.end_time}`).getTime();

            scheduleMap[dayOfWeek] = (scheduleMap[dayOfWeek] || []).filter(schedule => {
                const slotStart = schedule.startTime;
                const slotEnd = schedule.endTime;

                return leaveEnd <= slotStart || leaveStart >= slotEnd;
            });
        }
    });

    
    for (let [dayOfWeek, schedules] of Object.entries(scheduleMap)) {
        schedules.forEach(schedule => {
            let slotStartTime = schedule.startTime;
            const slotEndTime = schedule.endTime;
            const slotDurationMs = schedule.slotDuration * 60000; 

            while (slotStartTime < slotEndTime) {
                let slotEnd = slotStartTime + slotDurationMs;

                if (slotEnd <= slotEndTime) {
                    const isBooked = bookedSlots.some(bookedSlot => {
                        const overlap = !(slotEnd <= bookedSlot.startTime || slotStartTime >= bookedSlot.endTime);
                        return overlap;
                    });
                    if (!isBooked) {
                        availableSlots.push({
                            dayOfWeek,
                            startTime: new Date(slotStartTime).toTimeString().slice(0, 5),
                            endTime: new Date(slotEnd).toTimeString().slice(0, 5),
                            slotDuration: schedule.slotDuration
                        });
                    }
                }
                slotStartTime = slotEnd;
            }
        });
    }

    return availableSlots;
}









