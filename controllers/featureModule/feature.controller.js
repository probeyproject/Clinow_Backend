import { addFeatureModel, deleteFeatureModel, getFeatureByIdModel, getFeatureModel, updateFeatureModel } from "../../models/features.model.js"
import Jimp from "jimp"
import fs from "fs"
import path from "path"



export const addFeature=async(req,res)=>{
    const {featureName,description,featureLink,featureStatus,parentFeatureId}=req.body   
    console.log(req.body);
    
    if(!featureName||!description||!featureLink||!featureStatus){
        return res.status(400).json({message:"All fields required"})
    }
    const featureLogo=req.file
    try {
        let featureLogoUrl
    if (featureLogo) {
      const featureLogoPath = featureLogo.path;
      const cloudinaryResult = await cloudinary.uploader.upload(featureLogoPath, {
        folder: "feature_logo",
        public_id: `${Date.now()}-${path.basename(featureLogoPath)}`, // Unique filename
      });

      featureLogoUrl = cloudinaryResult.secure_url;
    fs.unlinkSync(featureLogoPath)
    }
        const result=await addFeatureModel(featureName,description,featureLogoUrl,featureLink,featureStatus,parentFeatureId)
        res.status(200).json({message:"Feature Added sucessfully",result})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const getFeautreById=async(req,res)=>{
    const {featureId}=req.params.featureId
    if(!featureId){
        res.status(200).json({message:"Id not received"})
    }
    try {
        const result=await getFeatureByIdModel(featureId)
        return res.status(200).json({message:"Feature fetch successfully",result})
    } catch (error) {
        res.status(500).json({message:message.error})
    }
    
}

export const getFeatures=async(req,res)=>{
    try {
        const result=await getFeatureModel()
        return res.status(200).json({message:"Feature Fetch sucessfully",result})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const updateFeature=async(req,res)=>{ 
    const {featureId}=req.params.featureId
    const {featureName,description,featureLink,featureStatus,parentFeatureId}=req.body
    const featureLogo=req.file 
    try {
        const feature=await getFeatureByIdModel(featureId)
        let featureLogoUrl=feature[0].feature_logo
            if (featureLogo) {
                const featureLogoPath = featureLogo.path;
                const cloudinaryResult = await cloudinary.uploader.upload(featureLogoPath, {
                  folder: "feature_logo",
                  public_id: `${Date.now()}-${path.basename(featureLogoPath)}`,
                });
          
                featureLogoUrl = cloudinaryResult.secure_url;
              fs.unlinkSync(featureLogoPath)
              }
        const result=await updateFeatureModel(featureId,featureName,description,featureLogoUrl,featureLink,featureStatus,parentFeatureId)
        return res.status(200).json({message:"Update sucessful"})
    } catch (error) {
     res.status(500).json({message:error.message})   
    }
}

export const deleteFeature=async(req,res)=>{
    const {featureId}=req.params
    try {
        const result =await deleteFeatureModel(featureId)
        return res.status(200).json({message:"delete successful"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}