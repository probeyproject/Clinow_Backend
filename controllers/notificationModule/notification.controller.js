import { getNotificationModel,updateNotificationModel,getNotificationByIdModel } from "../../models/notification.model.js";

export const getAllNotification=async(req,res)=>{
    const userId=req.params.userId
    if(!userId){
        return res.status(400).json({message:"Id not received"})
    }
    try {
        const result=await getNotificationModel(userId)
        return res.status(200).json({message:"All notifications",data:result})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const updateNotification=async(req,res)=>{
    const notificationId=req.params.notificationId
    const status=req.body.status
    if(!notificationId){
        return res.status(400).json({message:"Id not received"})
    }
    try {
        const result=await updateNotificationModel(notificationId,status)
        return res.status(200).json({message:"Notification updated successfully"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const getNotificationById=async(req,res)=>{
    const notificationId=req.params.notificationId
    if(!notificationId){
        return res.status(400).json({message:"Id not received"})}
        try {
        const result=await getNotificationByIdModel(notificationId)
        return res.status(200).json({message:"Notification",data:result})
    } catch (error) {
            return res.status(500).json({message:error.message})
    }
}
