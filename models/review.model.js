import db from "../db/db.js"

export const addReviewModel=async(userId,rating,review,doctorId)=>{
    try {
        const result=await db.query("insert into doctor_review (user_id,rating,review_text,doctor_id) values(?,?,?,?)",[userId,rating,review,doctorId])
        return result
    } catch (error) {
        throw new Error(`Error in adding Review ${error.message}`)
    }
}

export const getReviewModel=async()=>{
    try {

        const [result]=await db.query("select * from doctor_review")
        return result
        
    } catch (error) {
        throw new Error(`Error in getting review ${error.message}`)
    }
}

export const getReviewByIdModel=async(reviewId)=>{
    try {
        const [result]=await db.query("select * from doctor_review where review_id=?",[reviewId])
        return result
    } catch (error) {
        throw new Error(`Error in fetching review ${error.message}`)
    }
}

export const updateReviewStatusModel=async(status,reviewId)=>{
    try {
        const [result]=await db.query("update doctor_review set status=? where review_id=?",[status,reviewId])
        return result
    } catch (error) {
        throw Error(`Error in updating review status ${error.message}`)
    }
}

export const deleteReviewModel=async(reviewId)=>{
    try {
        const [result]=await db.query("delete from doctor_review where review_id=?",[reviewId])
        return result
    } catch (error) {
        throw Error(`Error in deleting review ${error.message}`)
    }
}   

export const getActiveReviewModel=async()=>{
    try {
        const [result]=await db.query("select * from doctor_review where status='active'")
        return result
    } catch (error) {
        throw Error(`Error in getting active review ${error.message}`)
    }
}