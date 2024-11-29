import db from "../db/db.js"

export const addTestinomialModel=async(userName,message,picUrl)=>{
    try {
        const result=await db.query("insert into testimonials (customer_name,message,photo_url) values(?,?,?)",[userName,message,picUrl])
        return result
    } catch (error) {
        throw new Error(`Error in adding testimonial ${error.message}`)
    }
}

export const getTestinomialModel=async()=>{
    try {
        const [result]=await db.query("select * from testimonials")
        return result
    } catch (error) {
        throw new Error(`Error in getting testimonial ${error.message}`)
    }
}

export const getTestinomialByIdModel=async(testimonialId)=>{
    try {
        const [result]=await db.query("select * from testimonials where testimonial_id=?",[testimonialId])
        return result
    } catch (error) {
        throw new Error(`Error in fetching testimonial ${error.message}`)
    }
}

export const updateTestinomialModel=async(testimonialId,userName,message,picUrl,status)=>{
    try {
        const result=await db.query("update testimonials set customer_name=?,message=?,photo_url=?,status=? where testimonial_id=?",[userName,message,picUrl,status,testimonialId])
        return result
    } catch (error) {
        throw new Error(`Error in updating testimonial ${error.message}`)
    }
}

export const deleteTestimonialModel=async(testimonialId)=>{
    try {
        const result=await db.query("delete from testimonials where testimonial_id=?",[testimonialId])
        return result
    } catch (error) {
        throw Error(`Error in deleting testimonial ${error.message}`)
    }
}

export const getActiveTestimonialModel=async()=>{
    try {
        const [result]=await db.query("select * from testimonials where status='active'")
        return result
    } catch (error) {
        throw Error(`Error in getting active testimonials ${error.message}`)
    }
}
