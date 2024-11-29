import db from "../db/db.js";

export const createSpecialityModel=async(name,description,image_url)=>{
    try {
        const [result]=await db.query("INSERT INTO specialties (name,description,image_url) VALUES (?,?,?)",[name,description,image_url])
        return result;
    } catch (error) {
        throw new Error(`Error in creating speciality ${error.message}`);
    }
}

export const getAllSpecialityModel=async()=>{
    try {
        const [result]=await db.query("SELECT * FROM specialties")
        return result;
    } catch (error) {
        throw new Error(`Error in getting speciality ${error.message}`);
    }
}

export const getSpecialityByIdModel=async(specialtyId)=>{
    try {
        const [result]=await db.query("SELECT * FROM specialties WHERE specialty_id=?",[specialtyId])
        return result;
    } catch (error) {
        throw new Error(`Error in getting speciality ${error.message}`);
    }
}

export const updateSpecialityModel=async(specialtyId,name,description,image_url)=>{
    try {
        const [result]=await db.query("UPDATE specialties SET name=?,description=?,image_url=? WHERE specialty_id=?",[name,description,image_url,specialtyId])
        return result;
    } catch (error) {
        throw new Error(`Error in updating speciality ${error.message}`);
    }
}

export const deleteSpecialityModel=async(specialtyId)=>{
    try {
        const [result]=await db.query("DELETE FROM specialties WHERE specialty_id=?",[specialtyId])
        return result;
    } catch (error) {
        throw new Error(`Error in deleting speciality ${error.message}`);
    }
}

export const getSpecialtyByName=async(specialityName)=>{
    try {
        const [result]=await db.query("select * from specialties where name=?",[specialityName])
        return result
    } catch (error) {
        throw new Error(`Error in getting specialty ${error.message}`)
    }
}