import { addClnicFeatureModel, deleteClinicFeatureModel, getAllClinicFeatureModel, getClinicFeatureByIdModel, updateClinicFeatureModel } from "../../models/clinic_feature.model.js"
import cloudinary from "../../config/cloudinary.js"
import fs from "fs"
import path from "path"
import Jimp from "jimp"


export const addClinicFeature =async(req,res)=>{
    const {featureName}=req.body
    if(!featureName){
        return res.status(400).json({message:"Feature Name is not received"})
    }
    const clinicImage=req.file
    if(!clinicImage){
        return res.status(400).json({message:"Image not received"})
    }
    try {
        let imgUrl;
        if (clinicImage) {
            const ImagePath = clinicImage.path;
            const compressedImagePath = path.join("compressImage", `${Date.now()}-compressed.jpg`);
      
            // Compress the image using Jimp
          const image = await Jimp.read(ImagePath);
          await image
            .resize(256, Jimp.AUTO) // Resize to width 800px, auto-adjust height
            .quality(80) // Set JPEG quality to 50%
            .writeAsync(compressedImagePath); // Save the compressed image
      
            const cloudinaryResult = await cloudinary.uploader.upload(compressedImagePath, {
              folder: "clinic_feature",
              public_id: `${Date.now()}-${path.basename(compressedImagePath)}`, // Unique filename
            });
      
            imgUrl = cloudinaryResult.secure_url;
          fs.unlinkSync(ImagePath)
          fs.unlinkSync(compressedImagePath)
          }
          const result=await addClnicFeatureModel(featureName,imgUrl)
          return res.status(200).json({message:"feature add successful",result})
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const getAllClinicFeature=async(req,res)=>{
    try {
        const result=await getAllClinicFeatureModel()
        return res.status(200).json({message:"fetch Successful",result})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const getClinicFeatureById=async(req,res)=>{
    const id=req.params.id
    if(!id){
        return res.status(400).json({message:"id not received"})
    }
    try {
        const result=await getClinicFeatureByIdModel(id)
        return res.status(200).json({message:'Fetch successful',result})
    } catch (error) {
        
    }
}

export const updateClinicFeature=async(req,res)=>{
    const id=req.params.id
    const {featureName,status}=req.body
    if(!id){
        return res.status(400).json({message:'Id not received'})
    }
    if(!featureName||!status){
        return res.status(400).json({message:"All field required"})
    }
    const clinicImage=req.file
    try {
        const feature=await getClinicFeatureByIdModel(id)

        let imgUrl=feature[0].img_url
        if(clinicImage){
            const ImagePath= clinicImage.path
            const compressedImagePath=path.join("compressImage",`${Date.now()}-compressed.jpg`)
            const image = await Jimp.read(ImagePath);
            await image
              .resize(256, Jimp.AUTO) // Resize to width 800px, auto-adjust height
              .quality(80) // Set JPEG quality to 50%
              .writeAsync(compressedImagePath); // Save the compressed image
        
              const cloudinaryResult = await cloudinary.uploader.upload(compressedImagePath, {
                folder: "clinic_feature",
                public_id: `${Date.now()}-${path.basename(compressedImagePath)}`, // Unique filename
              });
        
              imgUrl = cloudinaryResult.secure_url;
            fs.unlinkSync(ImagePath)
            fs.unlinkSync(compressedImagePath)
        }

        const result=await updateClinicFeatureModel(id,featureName,imgUrl,status)

        return res.status(200).json({message:"updated successful"})
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({message:error.message})
    }
}

export const deleteClinicFeature=async(req,res)=>{
    const id=req.params.id
    try {
        const result=await deleteClinicFeatureModel(id)
        return res.status(200).json({message:"Delete successful"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

