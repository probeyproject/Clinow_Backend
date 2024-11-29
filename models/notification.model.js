import db from "../db/db.js"

export const addNotificationModel=async(userId,message,type)=>{
    try {
        const [result]=await db.query("insert into notifications (user_id,message,type) values(?,?,?)",[userId,message,type])
        return result
    } catch (error) {
        throw new Error(`Error in adding notification ${error.message}`)
    }
}

export const getNotificationModel=async(userId)=>{
    try {
        const [result]=await db.query("select * from notifications where user_id=? and status='unread'",[userId])
        return result
    } catch (error) {
        throw new Error(`Error in getting notification ${error.message}`)
    }
}

export const updateNotificationModel=async(notificationId,status)=>{
    try {
        const [result]=await db.query("update notifications set status=? where notification_id=?",[status,notificationId])
        return result
    } catch (error) {
        throw new Error(`Error in updating notification ${error.message}`)
    }
}

export const getNotificationByIdModel=async(notificationId)=>{
    try {
        const [result]=await db.query("select * from notifications where notification_id=?",[notificationId])
        return result
    } catch (error) {
        throw new Error(`Error in getting notification ${error.message}`)
    }
}