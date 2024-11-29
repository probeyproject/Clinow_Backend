import { addPatientDetailModel,getAllActivePatientModel,getAllPatientModel,getPatientByIdModel,updatePatientDetailModel,deletePatientModel,getPatientByUserIdModel } from "../../models/patient.model.js";
import { getUserByIdModel } from "../../models/users.model.js";
import fs from "fs"
import path from "path"
import Jimp from "jimp";
import cloudinary from "../../config/cloudinary.js"

export const addPatient=async(req,res)=>{
    console.log(req.body)
    const userId=req.params.id;
    const {fullName,date_of_birth,gender,address,emergency_contact,blood_group,allergies,medical_history,height,weight,bmi,glucose_level,bp_systolic,bp_diastolic,sugar_level}=req.body
 
    try {
        const user = await getUserByIdModel(userId)
        if(user.length===0){
            return res.status(400).json({message:"User not exist"})
        }
        if(user[0].role_name!=='patient'){
            return res.status(400).json({message:"User not a patient"})
        }
        const patientExist=await getPatientByUserIdModel(userId)
        if(patientExist.length>0){
            return res.status(400).json({message:"Patient already exist"})
        }

        const result=await addPatientDetailModel(userId,fullName,date_of_birth,gender,address,emergency_contact,blood_group,allergies,medical_history,height,weight,bmi,glucose_level,bp_systolic,bp_diastolic,sugar_level)
        return res.status(200).json({message:"Patient added successfully"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const getPatientById=async(req,res)=>{
    const {patientId}=req.params;
    try {
        const result=await getPatientByIdModel(patientId)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const getAllPatient=async(req,res)=>{
    try {
        const result=await getAllPatientModel()
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const getAllActivePatient=async(req,res)=>{
    try {
        const result=await getAllActivePatientModel()
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const updatePatient =async(req,res)=>{
    const {userId,patientId}=req.params;
    const {fullName,date_of_birth,gender,address,emergency_contact,blood_group,allergies,medical_history,height,weight,bmi,glucose_level,bp_systolic,bp_diastolic,sugar_level,status}=req.body
    console.log(req.body);
    
    if(!fullName || !date_of_birth || !gender || !address || !emergency_contact || !blood_group || !allergies || !medical_history || !height || !weight || !bmi || !glucose_level || !bp_systolic || !bp_diastolic || !sugar_level){
        return res.status(400).json({message:"All fields are required"})
    }
    const profilePic=req.file;
    try {
        const users = await getUserByIdModel(userId);
        const user = users[0];
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        let profileUrl=user.profile_url;
        if (profilePic) {
            const profileImagePath = profilePic.path;
            const compressedImagePath = path.join("compressImage", `${Date.now()}-compressed.jpg`);
            // Compress the image using Jimp
            const image = await Jimp.read(profileImagePath);
            await image .resize(256, Jimp.AUTO) 
            .quality(80) 
            .writeAsync(compressedImagePath);
            const cloudinaryResult = await cloudinary.uploader.upload(compressedImagePath, {
                folder: "profile_image",
                public_id: `${Date.now()}-${path.basename(compressedImagePath)}`, // Unique filename
            })
            profileUrl = cloudinaryResult.secure_url;
            // Delete the local original file with a slight delay
            fs.unlinkSync(profileImagePath)
            fs.unlinkSync(compressedImagePath)
        }
      const result=await updatePatientDetailModel(patientId,fullName,date_of_birth,gender,address,emergency_contact,blood_group,allergies,medical_history,height,weight,bmi,glucose_level,bp_systolic,bp_diastolic,sugar_level,status,profileUrl)
        return res.status(200).json({message:"Patient updated successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error.message})
    }
}

export const deletePatient=async(req,res)=>{
    const {patientId}=req.params;
    try {
        const result=await deletePatientModel(patientId)
        if(result.affectedRows===0){
            return res.status(400).json({message:"Something went wrong"})
        }
        return res.status(200).json({message:"Patient deleted successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error.message})
    }
}