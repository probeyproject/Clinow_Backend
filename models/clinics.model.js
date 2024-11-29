import db from '../db/db.js'

export const addClinicModel=async(clinicName,address,imgUrls)=>{
    try{
        const result=await db.query("insert into clinics (clinic_name,address,img_urls) values (?,?,?)",[clinicName,address,imgUrls])
        return result
    }catch(error){
        throw new Error(`Error in adding clinic ${error.message}`)
    }
}

export const getClinicsModel=async()=>{
    try {
        const [result]=await db.query("select * from clinics")
        return result
    } catch (error) {
        throw new Error(`Error in fetching clinic ${error.message}`)
    }
}

export const getClinicByIdModel=async(clinicId)=>{
    try {
        const [result]=await db.query("select * from clinics where clinic_id=?",[clinicId])
        return result
    } catch (error) {
        throw new Error(`Error in fetching clinic ${error.message}`)
    }
}

export const updateClinicModel=async(clinicId,clinicName,address,imgUrls)=>{
    try {
        const result=await db.query("update clinics set clinic_name=?,address=?,img_urls=? where clinic_id=?",[clinicName,address,imgUrls,clinicId])
        return result
    } catch (error) {
        throw new Error(`Error in updating clinics ${error.message}`)
    }
}

export const deleteClinicModel=async(clinicId)=>{
    try {
        const result=await db.query("delete from clinics where clinic_id=?",[clinicId])
        return result
    } catch (error) {
        throw new Error(`Error in delete clinics ${error.message}`)
    }
}