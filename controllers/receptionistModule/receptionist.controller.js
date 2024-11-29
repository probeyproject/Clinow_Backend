import { addReceptionistDetailModel, getAllReceptionistModel, getReceptionistByIdModel, updateReceptionistModel } from "../../models/receptionist.model.js"




export const addReceptionist = async (req, res) => {
    const userId = req.params.userId;
    const { qualification, experienceYears } = req.body;
    if(!userId){
        return res.status(400).json({ message: "ID is required" });
    }
    if (!qualification || !experienceYears) {
        return res.status(400).json({ message: "All fields required" });
    }
    try {
        const result = await addReceptionistDetailModel(userId, JSON.stringify(qualification), JSON.stringify(experienceYears));
        return res.status(200).json({ message: "Receptionist added successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const getAllReceptionist = async (req, res) => {
    try {
        const result = await getAllReceptionistModel();
        return res.status(200).json({ message: "Receptionist fetched successfully", data: result });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const getReceptionistById = async (req, res) => {
    const receptionistId = req.params.id;
    if (!receptionistId) {
        return res.status(400).json({ message: "ID is required" });
    }
    try {
        const result = await getReceptionistByIdModel(receptionistId);
        return res.status(200).json({ message: "Receptionist fetched successfully", data: result });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateReceptionist=async(req,res)=>{
    const receptionistId=req.params.id
    const {qualification,experienceYears}=req.body
    if(!receptionistId){
        return res.status(400).json({message:"Id not received"})
    }
    try {
        const result=await updateReceptionistModel(receptionistId,JSON.stringify(qualification),JSON.stringify(experienceYears))
        return res.status(200).json({message:"Receptionist updated successfully"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}