import db from "../db/db.js"

export const addFavouriteModel=async(userId,doctorId)=>{
    try {
        
        const [result]=await db.query("insert into favourite (user_id,doctor_id) values (?,?)",[userId,doctorId])
        return result
    } catch (error) {
        throw new Error(`Error in Inserting Favourites ${error.message}`)
    }
}

export const getAllFavouriteDoctorByUserIdModel=async(userId)=>{
    try {
        const [result]=await db.query("select * from favourite where user_id=?",[userId])
        return result
    } catch (error) {
        throw new Error(`Error in fetching ${error.message}`)
    }
}

export const deleteFavouriteModel=async(id)=>{
    try {
        const [result]=await db.query("delete from favourite where favourite_id=?",[id])
        return result
    } catch (error) {
        throw new Error(`Error in deleting ${error.message}`)
    }
}
