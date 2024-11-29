import { addClinicModel, deleteClinicModel, getClinicByIdModel, getClinicsModel, updateClinicModel } from "../../models/clinics.model.js";
import fs from "fs";
import cloudinary from "cloudinary";


export const addClinic = async (req, res) => {
    const { clinicName, address } = req.body;
    if (!clinicName || !address) {
        return res.status(400).json({ message: "Field required" })
    }
    const clinicImages = req.files
    if (!clinicImages) {
        return res.status(400).json({ message: "Image not uploaded" })
    }
    try {
        const uploadedFiles = [];

        for (const file of clinicImages) {
            const imagePath= file.path
            const uploadResult = await cloudinary.uploader.upload(imagePath, {
                resource_type: "auto",
                folder: "/medical_reports",
            });
            fs.unlinkSync(imagePath);
            uploadedFiles.push(uploadResult.secure_url);
        }
        const result=await addClinicModel(clinicName,address,JSON.stringify(uploadedFiles))
        return res.status(200).json({message:"Clinic Added Successful"})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error.message})
    }
}

export const getClinics=async(req,res)=>{
    try {
        const result=await getClinicsModel()
        return res.status(200).json({message:"Fetch successful",result})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const getClinicById=async(req,res)=>{
    const {clinicId}=req.params
    try {
        const result=await getClinicByIdModel(clinicId)
        return res.status(200).json({message:"Fetch successful",result})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const updateClinic=async(req,res)=>{
    const {clinicId}=req.params
    const {clinicName,address}=req.body
    const clinicImages=req.files

    if(!clinicId){
        return res.status(400).json({message:"Id not received"})
    }
    try {
        const result=await getClinicByIdModel(clinicId)
        const uploadedFiles = []
        if(clinicImages){
            for (const file of clinicImages) {
                 const ImagePath = file.path

                const uploadResult = await cloudinary.uploader.upload(ImagePath, {
                    resource_type: "auto",
                    folder: "clinic_image",
                });
                fs.unlinkSync(ImagePath);
                uploadedFiles.push(uploadResult.secure_url);
            }
            const update=await updateClinicModel(clinicId,clinicName,address,JSON.stringify(uploadedFiles))
            return res.status(200).json({message:"Update successful"})
        }

    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const deleteClinic=async(req,res)=>{
    const {clinicId}=req.params
    if(!clinicId){
        return res.status(400).json({message:"ID required"})
    }
    try {
        const result=await deleteClinicModel(clinicId)
        return res.status(200).json({message:"Success"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}