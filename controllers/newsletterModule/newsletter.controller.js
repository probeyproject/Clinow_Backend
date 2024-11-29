import { addNewsletterModel, deleteNewsletterModel, getNewsletterByEmailModel, getNewsletterByIdModel, getNewsletterModel, updateNewsletterModel } from "../../models/newsletter.model.js"


export const addNewsletter=async(req,res)=>{
    const {email}=req.body
    if(!email){
        return res.status(400).json({message:"Please provide all the required fields"})
    }
    try {
        const news=await getNewsletterByEmailModel(email)
        if(news.length>0){
            return res.status(400).json({message:"Already Subscribed"})
        }
        const result=await addNewsletterModel(email)
        return res.status(200).json({message:"Newsletter added successfully"})

    } catch (error) {
        res.status(500).json({message:`Error in adding newsletter ${error.message}`})
    }
}

export const getNewsletter=async(req,res)=>{
    try {
        const result=await getNewsletterModel()
        return res.status(200).json({message:"Newsletter fetched successfully",data:result})
    } catch (error) {
        res.status(500).json({message:`Error in getting newsletter ${error.message}`})
    }
}

export const getNewsletterById=async(req,res)=>{
    const {newsletterId}=req.params
    try {
        const result=await getNewsletterByIdModel(newsletterId)
        return res.status(200).json({message:"Newsletter fetched successfully",data:result})
    } catch (error) {
        res.status(500).json({message:`Error in getting newsletter ${error.message}`})
    }
}

export const updateNewsletter=async(req,res)=>{
    const {newsletterId}=req.params
    const {subscription_status}=req.body
    if(!subscription_status){
        return res.status(400).json({message:"Please provide all the required fields"})
    }
    try {
        const result=await updateNewsletterModel(newsletterId,subscription_status)
        return res.status(200).json({message:"Newsletter updated successfully"})
    } catch (error) {
        res.status(500).json({message:`Error in updating newsletter ${error.message}`})
    }
}

export const deleteNewsletter=async(req,res)=>{
    const {newsletterId}=req.params
    try {
        const result=await deleteNewsletterModel(newsletterId)
        return res.status(200).json({message:"Newsletter deleted successfully"})
    } catch (error) {
        res.status(500).json({message:`Error in deleting newsletter ${error.message}`})
    }
}