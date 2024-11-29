import db from "../db/db.js";

export const addClnicFeatureModel =async(featureName,imgUrl)=>{

    try {
        const result=await db.query("insert into clinic_feature (feature_name,img_url) values(?,?)",[featureName,imgUrl])
        return result
    } catch (error) {
        throw new Error(`Error in inserting ${error.message}`)
    }
}

export const getAllClinicFeatureModel=async()=>{
    try {
        const [result]=await db.query("select * from clinic_feature")
        return result
    } catch (error) {
        throw new Error(`Error in fetching clinic feature ${error.message}`)
    }
}

export const getClinicFeatureByIdModel=async(id)=>{
    try {
        const [result]=await db.query("select * from clinic_feature where id=?",[id])
        return result
    } catch (error) {
        throw new Error(`Error in fetching clinic feature ${error.message}`)
    }
}

export const updateClinicFeatureModel=async(id,featureName,imgUrl,status)=>{
    try {
        const result = await db.query(
            "UPDATE clinic_feature SET feature_name = ?, img_url = ?, status = ? WHERE id = ?",
            [featureName, imgUrl, status, id]
          ); return result
    } catch (error) {
        throw new Error(`Error in updating clinic feature ${error.message}`)
    }
}

export const deleteClinicFeatureModel=async(id)=>{
    try {
        const result =await db.query("delete from clinic_feature where id=?",[id])
        return result
    } catch (error) {
        throw new Error(`Error in deleting clinic feature ${error.message}`)
    }
}