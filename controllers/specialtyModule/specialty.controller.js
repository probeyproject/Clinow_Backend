import { createSpecialityModel, getAllSpecialityModel, getSpecialityByIdModel, updateSpecialityModel, deleteSpecialityModel } from "../../models/speciality.model.js";
import Jimp from "jimp";
import fs from "fs"
import path from "path"
import cloudinary from "../../config/cloudinary.js";

export const createSpeciality=async(req,res)=>{
    const {name,description}=req.body;
    if(!name||!description){
        return res.status(400).json({message:"All fields required"})
    }
    const specialtyImage=req.file;
    if(!specialtyImage){
        return res.status(400).json({message:"Specialty image is required"})
    }
    try {
        let image_url;

        const specialtyImagePath=specialtyImage.path;
        const compressedImagePath=path.join("compressImage", `${Date.now()}-compressed.jpg`);
        const image=await Jimp.read(specialtyImagePath)
        await image
        .resize(256, Jimp.AUTO) 
        .quality(80)
        .writeAsync(compressedImagePath);
        const cloudinaryResult = await cloudinary.uploader.upload(compressedImagePath, {
            folder: "profile_image",
            public_id: `${Date.now()}-${path.basename(compressedImagePath)}`, // Unique filename
          });
    
          image_url = cloudinaryResult.secure_url;
              // Delete the local original file with a slight delay
        fs.unlinkSync(specialtyImagePath)
        fs.unlinkSync(compressedImagePath)

        const result=await createSpecialityModel(name,description,image_url);
        return res.status(200).json({message:"Speciality created successfully",result})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const getAllSpeciality=async(req,res)=>{
    try {
        const result=await getAllSpecialityModel();
        return res.status(200).json({message:"Speciality retrieved successfully",result})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const getSpecialityById=async(req,res)=>{
    const specialtyId=req.params.id;
    try {
        const result=await getSpecialityByIdModel(specialtyId);
        return res.status(200).json({message:"Speciality retrieved successfully",result})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const updateSpeciality=async(req,res)=>{
    const specialtyId=req.params.id;
    const {name,description}=req.body;
    const specialtyImage=req.file
    try {
        const specialty=await getSpecialityByIdModel(specialtyId)
        let image_url=specialty[0].image_url
        if(specialtyImage){
            const specialtyImagePath=specialtyImage.path;
            const compressedImagePath=path.join("compressImage", `${Date.now()}-compressed.jpg`);
            const image=await Jimp.read(specialtyImagePath)
            await image
            .resize(256, Jimp.AUTO) 
            .quality(80)
            .writeAsync(compressedImagePath);
            const cloudinaryResult = await cloudinary.uploader.upload(compressedImagePath, {
                folder: "profile_image",
                public_id: `${Date.now()}-${path.basename(compressedImagePath)}`, // Unique filename
              });
        
              image_url = cloudinaryResult.secure_url;
              // Delete the local original file with a slight delay
            fs.unlinkSync(specialtyImagePath)
            fs.unlinkSync(compressedImagePath)
    
        }
        const result=await updateSpecialityModel(specialtyId,name,description,image_url);
        return res.status(200).json({message:"Speciality updated successfully",result})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const deleteSpeciality=async(req,res)=>{
    const specialtyId=req.params.id;
    try {
        const result=await deleteSpecialityModel(specialtyId);
        return res.status(200).json({message:"Speciality deleted successfully",result})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
