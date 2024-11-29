import { addDoctorModel, getAllDoctorModel, getDoctorByIdModel,updateDoctorModel, deleteDoctorModel,getAllActiveDoctorModel, getDoctorByUserId } from "../../models/doctor.model.js";
import { getSpecialtyByName } from "../../models/speciality.model.js";
import { getUserByIdModel } from "../../models/users.model.js";
import fs from "fs"
import path from "path";
import cloudinary from "cloudinary"
import Jimp from "jimp"

export const addDoctor=async(req,res)=>{
    const userId =req.params.id;
    if(!userId){
        return res.status(400).json({message:"Id not received"})
    }
    const doctor=await getDoctorByUserId(userId)
    if(doctor.length>0){
       return res.status(400).json({message:`Doctor already exist with userId ${userId}`}) 
    }

    const {specialityName,degree,field,availability,description,fee,followUpDays,year,detail}=req.body;
    if(!specialityName||!degree||!year||!availability||!description||!fee){
        return res.status(400).json({message:"All fields required"})
    }
try{
    const user= await getUserByIdModel(userId)
    if(user.length===0){
        return res.status(400).json({message:"User not exist"})
    }
    if(user[0].role_name!=='doctor'){
        return res.status(400).json({message:"User not a doctor"})
    }
    const specialty= await getSpecialtyByName(specialityName)

    if(specialty.length===0){
        return res.status(400).json({message:"No Specialty by Occur"})
    }
    const specialtyId=specialty[0].specialty_id;
    const result=await addDoctorModel(userId,specialtyId,degree,field,availability,description,fee,followUpDays,year,detail)
    return res.status(200).json({message:"doctor added successfully"})
}catch(err){
    return res.status(500).json({message:err.message})
}
}

export const getAllDoctor=async(req,res)=>{
    try {
        const doctors = await getAllDoctorModel()
        if(doctors.length===0){
            return res.status(400).json({message:"No doctors found"})
        }
        doctors.forEach(doctor => {
            delete doctor.password;
        }); 
        return res.status(200).json({message:"Success",doctors})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const getDoctorById=async(req,res)=>{
    const doctorId = req.params.doctorId
    if(!doctorId){
        return res.status(400).json({message:"Id not received"})
    }
    try {

        const doctor=await getDoctorByIdModel(doctorId)
        delete doctor[0].password;
        return res.status(200).json({message:"User fetched successfully",doctor})
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const updateDoctor=async(req,res)=>{
    const {doctorId}=req.params
    const {firstName,middleName,lastName,email,phone,gender,degree,field,availability,fee,description,status,followUpDays,year,detail}=req.body
    if(!firstName||!lastName||!email||!phone||!gender||!degree||!year||!availability||!fee||!description){
        return res.status(400).json({message:"All Fields required"})
    }
    const profilePic=req.file

    try {
        const doctor=await getDoctorByIdModel(doctorId)
        if(doctor.length===0){
            return res.status(400).json({message:"Doctor not found"})
        }
        const userId=doctor[0].user_id
        const users = await getUserByIdModel(userId);
        const user = users[0];
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        let profileUrl=user.profile_url;
        if (profilePic) {
            const profileImagePath = profilePic.path;
            const compressedImagePath = path.join("compressImage", `${Date.now()}-compressed.jpg`);
            const image = await Jimp.read(profileImagePath);
            await image .resize(256, Jimp.AUTO)
            .quality(80)
            .writeAsync(compressedImagePath);
            const cloudinaryResult = await cloudinary.uploader.upload(compressedImagePath, {
                folder: "profile_image",
                public_id: `${Date.now()}-${path.basename(compressedImagePath)}`,
            })
            profileUrl = cloudinaryResult.secure_url;
            fs.unlinkSync(profileImagePath)
            fs.unlinkSync(compressedImagePath)
        }
        const result = await updateDoctorModel(firstName,middleName,lastName,email,phone,gender,degree,field,availability,fee,description,userId,doctorId,profileUrl,status,followUpDays,year,detail)
        if(result.affectedRows===0){
            return res.status(400).json({message:"Something went wrong"})
        }
        return res.status(200).json({message:"Doctor updated successfully"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }

}

export const deleteDoctor = async(req,res)=>{
    const doctorId = req.params.doctorId
    if(!doctorId){
        return res.status(400).json({message:"Id not received"})
    }
    const doctor = await getDoctorByIdModel(doctorId)
    if(doctor.length===0){
        return res.status(400).json({message:"Doctor not found"})
    }
    try {
        const result = await deleteDoctorModel(doctorId)
        return res.status(200).json({message:"Doctor deleted successfully"})
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({message:error.message})
    }
}

export const getAllActiveDoctor=async(req,res)=>{
    try {
        const doctors = await getAllActiveDoctorModel()
        if(doctors.length===0){
            return res.status(400).json({message:"No doctors found"})
        }
        doctors.forEach(doctor => {
            delete doctor.password;
        });
        return res.status(200).json({message:"Success",doctors})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}