import { addReviewModel, getReviewModel, getReviewByIdModel, updateReviewStatusModel, deleteReviewModel, getActiveReviewModel } from "../../models/review.model.js";

export const addReview=async(req,res)=>{
    const {userId,rating,review,doctorId}=req.body;
    if(!userId||!review||!doctorId||!rating){
        return res.status(400).json({message:"All fields required"})
    }
    try {
        const result=await addReviewModel(userId,rating,review,doctorId);
        return res.status(200).json({message:"Review added successfully",result})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const getReview=async(req,res)=>{
    try {
        const result=await getReviewModel();
        return res.status(200).json({message:"Review retrieved successfully",result})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const getReviewById=async(req,res)=>{
    const {reviewId}=req.params;
    if(!reviewId){
        return res.status(400).json({message:"Review id is required"})
    }
    try {
        const result=await getReviewByIdModel(reviewId);
        return res.status(200).json({message:"Review retrieved successfully",result})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const updateReviewStatus=async(req,res)=>{
    const {reviewId}=req.params;
    const {status}=req.body;
    if(!reviewId){
        return res.status(400).json({message:"Review id is required"})
    }
    if(!status){
        return res.status(400).json({message:"Status is required"})
    }
    try {
        const result=await updateReviewStatusModel(status,reviewId);
        return res.status(200).json({message:"Review status updated successfully",result})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const deleteReview=async(req,res)=>{
    const {reviewId}=req.params;
    if(!reviewId){
        return res.status(400).json({message:"Review id is required"})
    }
    try {
        const result=await deleteReviewModel(reviewId);
        return res.status(200).json({message:"Review deleted successfully",result})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const getActiveReview=async(req,res)=>{
    try {
        const result=await getActiveReviewModel();
        return res.status(200).json({message:"Review retrieved successfully",result})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}