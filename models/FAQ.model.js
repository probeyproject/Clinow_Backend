import db from "../db/db.js"

export const addFaqModel=async(question,answer)=>{
    try {
        const [result]=await db.query("insert into faq (question,answer) values(?,?)",[question,answer])
        return result
    } catch (error) {
        throw new Error(`Error in adding FAQ ${error.message}`)
    }
}

export const getAllFaqModel=async()=>{
    try {
        const [result]=await db.query("select * from faq")
        return result
    } catch (error) {
        throw new Error(`Error in getting All FAQ ${error.message}`)
    }
}

export const getFaqByIdModel=async(faqId)=>{
    try {
        const [result]=await db.query("select * from faq where id=?",[faqId])
        return result
    } catch (error) {
        throw new Error(`Error in getting FAQ ${error.message}`)
    }
}

export const updateFaqByIdModel=async(faqId,question,answer,status)=>{
    try {
        const [result]=await db.query("update faq set question=?,answer=?,status=? where id=?",[question,answer,status,faqId])
        return result
    } catch (error) {
        throw new Error(`Error in updating FAQ ${error.message}`)
    }
}

export const deleteFaqByIdModel=async(faqId)=>{
    try {
        const [result]=await db.query("delete from faq where id=?",[faqId])
        return result
    } catch (error) {
        throw new Error(`Error in deleting FAQ ${error.message}`)
    }
}

export const getAllActiveFaqModel=async()=>{
    try {
        const [result]=await db.query("select * from faq where status='active'")
        return result
    } catch (error) {
        throw new Error(`Error in getting All Active FAQ ${error.message}`)
    }
}