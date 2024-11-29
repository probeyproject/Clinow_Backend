import fs from "fs";
import path from "path";
import Jimp from "jimp";
import cloudinary from "../../config/cloudinary.js";
import { addTestinomialModel, deleteTestimonialModel, getActiveTestimonialModel, getTestinomialByIdModel, getTestinomialModel, updateTestinomialModel } from "../../models/testimonial.model.js";


export const addTestimonial=async(req,res)=>{
    const {userName,message}=req.body
    if(!userName || !message){
        return res.status(400).json({message:"Please provide all the required fields"})
    }
    const file = req.file;
    if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    try {
        let picUrl;
        if (file) {
          const filePath = file.path;
          const compressedImagePath = path.join("compressImage", `${Date.now()}-compressed.jpg`);
    
          // Compress the image using Jimp
        const image = await Jimp.read(filePath);
        await image
          .resize(800, Jimp.AUTO) 
          .quality(90) 
          .writeAsync(compressedImagePath);
    
          const cloudinaryResult = await cloudinary.uploader.upload(compressedImagePath, {
            folder: "testimonial_image",
            public_id: `${Date.now()}-${path.basename(compressedImagePath)}`,
          });
    
          picUrl = cloudinaryResult.secure_url;
        fs.unlinkSync(filePath)
        fs.unlinkSync(compressedImagePath)
        }
        const result=await addTestinomialModel(userName,message,picUrl)
        return res.status(200).json({message:"Testimonial added successfully"})
    } catch (error) {
        res.status(500).json({message:`Error in adding testimonial ${error.message}`})
    }
}

export const getTestimonials=async(req,res)=>{
    try {
        const result=await getTestinomialModel()
        return res.status(200).json({message:"Testimonials fetched successfully",data:result})
    } catch (error) {
        res.status(500).json({message:`Error in fetching testimonials ${error.message}`})
    }
}

export const getTestinomialById=async(req,res)=>{
    const testimonialId=req.params.testimonialId
    try {
        const result=await getTestinomialByIdModel(testimonialId)
        return res.status(200).json({message:"Testimonial fetched successfully",data:result})
    } catch (error) {
        res.status(500).json({message:`Error in fetching testimonial ${error.message}`})
    }
}

export const deleteTestimonial=async(req,res)=>{
    const testimonialId=req.params.testimonialId
    try {
        const result=await deleteTestimonialModel(testimonialId)
        return res.status(200).json({message:"Testimonial deleted successfully"})
    } catch (error) {
        res.status(500).json({message:`Error in deleting testimonial ${error.message}`})
    }
}

export const updateTestinomial=async(req,res)=>{
    const testimonialId=req.params.testimonialId
    const {userName,message,status}=req.body
    if(!userName || !message || !status){
        return res.status(400).json({message:"Please provide all the required fields"})
    }
    const file = req.file;
    
    try {
        
        const testimonial=await getTestinomialByIdModel(testimonialId)
        let picUrl=testimonial[0].photo_url
        if(file){
            const filePath = file.path;
            const compressedImagePath = path.join("compressImage", `${Date.now()}-compressed.jpg`);
            const image = await Jimp.read(filePath);
            await image
              .resize(800, Jimp.AUTO)
              .quality(90)
              .writeAsync(compressedImagePath);
            const cloudinaryResult = await cloudinary.uploader.upload(compressedImagePath, {
                folder: "testimonial_image",
                public_id: `${Date.now()}-${path.basename(compressedImagePath)}`,
              });
            picUrl=cloudinaryResult.secure_url
            fs.unlinkSync(filePath)
            fs.unlinkSync(compressedImagePath)
        }
        const result=await updateTestinomialModel(testimonialId,userName,message,picUrl,status)
        return res.status(200).json({message:"Testimonial updated successfully"})
    } catch (error) {
        res.status(500).json({message:`Error in updating testimonial ${error.message}`})
    }
}

export const getActiveTestimonial=async(req,res)=>{
    try {
        const result=await getActiveTestimonialModel()
        return res.status(200).json({message:"Active testimonials fetched successfully",result})
    } catch (error) {
        res.status(500).json({message:`Error in fetching active testimonials ${error.message}`})
    }
}