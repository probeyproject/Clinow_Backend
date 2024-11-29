import fs from "fs"
import path from "path"
import cloudinary from '../../config/cloudinary.js'
import Jimp from "jimp"
import { addTreatmentModel, getAllActiveTreatmentModel, getAllTreatmentModel, updateTreatmentModel,getTreatmentByIdModel, deleteTreatmentModel } from "../../models/treatments.model.js"

export const addTreatment=async(req,res)=>{
    const {treatmentName,cost,specialtyId}=req.body
    if(!treatmentName||!cost){
        return res.status(400).json({message:"All fields required"})
    }
    const treatmentImage=req.file
    if(!treatmentImage){
        return res.status(400).json({message:"imgae is required"})
    }
    try {
        let img_url;
        if(treatmentImage){
            const ImagePath = treatmentImage.path;
            const compressedImagePath = path.join("compressImage", `${Date.now()}-compressed.jpg`);
            const image = await Jimp.read(ImagePath);
            await image .resize(256, Jimp.AUTO) 
            .quality(80) 
            .writeAsync(compressedImagePath);
            const cloudinaryResult = await cloudinary.uploader.upload(compressedImagePath, {
                folder: "treatment_image",
                public_id: `${Date.now()}-${path.basename(compressedImagePath)}`, // Unique filename
            })
            img_url = cloudinaryResult.secure_url;
            fs.unlinkSync(ImagePath)
            fs.unlinkSync(compressedImagePath)
        }
        const result=await addTreatmentModel(img_url,treatmentName,cost,specialtyId)
        return res.status(200).json({message:"Treatment added successfully"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const getAllTreatment=async(req,res)=>{
    try {
        const result=await getAllTreatmentModel()
        return res.status(200).json({message:"Treatment fetched successfully",data:result})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const getTreatmentById=async(req,res)=>{
    const {treatmentId}=req.params
    if(!treatmentId){
        return res.status(400).json({message:"Id not received"})
    }
    try {
        const result=await getTreatmentByIdModel(treatmentId)
        return res.status(200).json({message:"Treatment fetched successfully",data:result})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const updateTreatment=async(req,res)=>{
    const {treatmentId}=req.params
    const {treatmentName,cost,status,specialtyId}=req.body
    if(!treatmentId){
        return res.status(400).json({message:"Id not received"})
    }
    const treatmentImage=req.file
    try {
        let img_url;
        const treatment=await getTreatmentByIdModel(treatmentId)
        img_url = treatment[0].image_url;
        if(treatmentImage){
            const ImagePath = treatmentImage.path;
            const cloudinaryResult = await cloudinary.uploader.upload(ImagePath, {
                folder: "treatment_image",
                public_id: `${Date.now()}-${path.basename(ImagePath)}`, // Unique filename
            })
            img_url = cloudinaryResult.secure_url;
            fs.unlinkSync(ImagePath)
        }
        const result=await updateTreatmentModel(treatmentId,img_url,treatmentName,cost,status,specialtyId)
        return res.status(200).json({message:"Treatment updated successfully"})
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({message:error.message})
    }
}

export const deleteTreatment=async(req,res)=>{
    const {treatmentId}=req.params
    if(!treatmentId){
        return res.status(400).json({message:"Id not received"})
    }
    try {
        const result=await deleteTreatmentModel(treatmentId)
        return res.status(200).json({message:"Treatment deleted successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error.message})
    }
}

export const getAllActiveTreatment=async(req,res)=>{
    try {
        const result=await getAllActiveTreatmentModel()
        return res.status(200).json({message:"Fetch success"},result)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error.message})
    }
}