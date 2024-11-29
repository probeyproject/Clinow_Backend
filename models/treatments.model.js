import db from "../db/db.js"

export const addTreatmentModel=async(img_url,treatmentName,cost,specialtyId)=>{

    try {
        const [result]=await db.query("insert into treatments (image_url,treatment_name,cost,specialty_id) values(?,?,?,?)",[img_url,treatmentName,cost,specialtyId])
        return result
    } catch (error) {
        throw new Error(`Error in adding treatment ${error.message}`)
    }

}

export const getAllTreatmentModel=async()=>{
    try {
        const [result]=await db.query("select treatments.*,specialties.name from treatments join specialties on treatments.specialty_id=specialties.specialty_id")
        return result
    } catch (error) {
        throw new Error(`Error in getting treatment ${error.message}`)
    }
}   

export const getTreatmentByIdModel=async(treatmentId)=>{
    try {
        const [result]=await db.query("select treatments.*,specialties.name from treatments join specialties on treatments.specialty_id=specialties.specialty_id where id=?",[treatmentId])
        return result
    } catch (error) {
        throw new Error(`Error in getting treatment ${error.message}`)
    }
}

export const updateTreatmentModel=async(treatmentId,img_url,treatmentName,cost,status,specialtyId)=>{
    try {
        const [result]=await db.query("update treatments set image_url=?,treatment_name=?,cost=?,status=?,specialty_id=? where id=?",[img_url,treatmentName,cost,status,specialtyId,treatmentId])
        return result
    }catch{
        throw new Error(`Error in updating treatment ${error.message}`)
    }
}

export const deleteTreatmentModel=async(treatmentId)=>{
    try {
        const [result]=await db.query("delete from treatments where id=?",[treatmentId])
        return result
    } catch (error) {
        throw new Error(`Error in deleting treatment ${error.message}`)
    }
}

export const getAllActiveTreatmentModel=async()=>{
    try {
        const [result]=await db.query("select treatments.*,specialties.name from treatments join specialties on treatments.specialty_id=specialties.specialty_id where status='active'")
        return result
    } catch (error) {
        throw new Error(`Error in getting treatment ${error.message}`)
    }
}