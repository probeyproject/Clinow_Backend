import { addFaqModel, deleteFaqByIdModel, getAllActiveFaqModel, getAllFaqModel, getFaqByIdModel, updateFaqByIdModel } from "../../models/FAQ.model.js";


export const addFaq=async(req,res)=>{
    const {question,answer}=req.body;
    if(!question || !answer){
        return res.status(400).json({message:"All fields are required"})
    }
    try {
        const result=await addFaqModel(question,answer)
        return res.status(200).json({message:"FAQ added successfully"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const getAllFaq=async(req,res)=>{
    try {
        const result=await getAllFaqModel()
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const getFaqById=async(req,res)=>{
    const {faqId}=req.params;
    if(!faqId){
        return res.status(400).json({message:"FAQ Id is required"})
    }
    try {
        const result=await getFaqByIdModel(faqId)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const updateFaqById=async(req,res)=>{
    const {faqId}=req.params;
    const {question,answer,status}=req.body;
    if(!faqId){
        return res.status(400).json({message:"FAQ Id is required"})
    }
    if(!question || !answer || !status){
        return res.status(400).json({message:"All fields are required"})
    }
    try {
        const result=await updateFaqByIdModel(faqId,question,answer,status)
        return res.status(200).json({message:"FAQ updated successfully"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const deleteFaqById=async(req,res)=>{
    const {faqId}=req.params;
    if(!faqId){
        return res.status(400).json({message:"FAQ Id is required"})
    }
    try {
        const result=await deleteFaqByIdModel(faqId)
        return res.status(200).json({message:"FAQ deleted successfully"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const getAllActiveFaq=async(req,res)=>{
    try {
        const result=await getAllActiveFaqModel()
        return res.status(200).json({message:"fetch successful"},result)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}