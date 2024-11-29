import db from "../db/db.js"

export const addNewsletterModel=async(email)=>{
    try {
        const [result]=await db.query("insert into newsletter (email) values(?)",[email])
        return result
    } catch (error) {
        throw new Error(`Error in adding newsletter ${error.message}`)
    }
}

export const getNewsletterModel=async()=>{
    try {
        const [result]=await db.query("select * from newsletter")
        return result
    } catch (error) {
        throw new Error(`Error in getting newsletter ${error.message}`)
    }
}   

export const getNewsletterByIdModel=async(newsletterId)=>{
    try {
        const [result]=await db.query("select * from newsletter where newsletter_id=?",[newsletterId])
        return result
    } catch (error) {
        throw new Error(`Error in getting newsletter ${error.message}`)
    }
}

export const updateNewsletterModel=async(newsletterId,subscription_status)=>{
    try {
        const [result]=await db.query("update newsletter set subscription_status=? where newsletter_id=?",[subscription_status,newsletterId])
        return result
    }catch{
        throw new Error(`Error in updating newsletter ${error.message}`)
    }
}

export const deleteNewsletterModel=async(newsletterId)=>{
    try {
        const [result]=await db.query("delete from newsletter where newsletter_id=?",[newsletterId])
        return result
    } catch (error) {
        throw new Error(`Error in deleting newsletter ${error.message}`)
    }
}

export const getNewsletterByEmailModel=async(email)=>{
    try {
        const [result]=await db.query("select * from newsletter where email=?",[email])
        return result
    } catch (error) {
        throw new Error(`Error in fetching`)
    }
}