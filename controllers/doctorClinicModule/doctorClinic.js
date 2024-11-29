import { addDoctorClinicModel, deleteDoctorClinicModel, getDoctorClinicByClinicIdModel, getDoctorClinicModel, getDoctorClinicModelByDoctorId } from "../../models/doctorClinic.model.js";


export const addDoctorClinic = async (req, res) => {
    const { doctorId, clinicIds } = req.body;
    try {
        const result = await addDoctorClinicModel(doctorId, clinicIds)
        res.status(200).json({
            message: "Doctor Clinic Added Successfully",
            result
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

export const getDoctorClinic = async (req, res) => {
    try {
        const result = await getDoctorClinicModel()
        res.status(200).json({
            message: "Doctor Treatment Clinic",
            result
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

export const getDoctorClinicByDoctorId=async(req,res)=>{
    const doctorId=req.params.doctorId
    try {
        const result=await getDoctorClinicModelByDoctorId(doctorId)
        res.status(200).json({
            message:"Doctor Treatment Clinic By Doctor Id",
            result
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error",
            error:error.message
        })
    }
}
export const getDoctorClinicByClinicId=async(req,res)=>{
    const clinicId=req.params.clinicId
    try {
        const result=await getDoctorClinicByClinicIdModel(clinicId)
        res.status(200).json({
            message:"Doctor Treatment Clinic By Clinic Id",
            result
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error",
            error:error.message
        })
    }
}


export const deletedoctorClinicById=async(req,res)=>{
    const id=req.params.id
    try {
        const result=await deleteDoctorClinicModel(id)
        res.status(200).json({
            message:"Treatment Deleted Successfully",
            result
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error",
            error:error.message
        })
    }
}