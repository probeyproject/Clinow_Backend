import { createRoleModel,getAllRoleModel,updateRoleModel,deleteRoleModel,getRoleByIdModel } from "../../models/roles.model.js";

export const createRole = async (req, res) => {
  const { roleName, description } = req.body;
if (!roleName || !description) {
    return res.status(400).json({ message: "All fields required" });
  }
  try {
    const result = await createRoleModel(roleName, description);
    return res.status(200).json({ message: "Role created", result });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

export const getAllRole = async(req,res)=>{
    try {
        const result = await getAllRoleModel()
        return res.status(200).json({message:"Roles fetched",result})
    }catch (error) {
        return res.status(500).json({message:"Internal server error",error:error.message})
    }
}

export const getRoleById=async(req,res)=>{
    const {roleId}=req.params
    try {
        const result = await getRoleByIdModel(roleId)
        return res.status(200).json({message:"Role fetched",result})
    }catch (error) {
        return res.status(500).json({message:"Internal server error",error:error.message})
    }
}
export const updateRole=async(req,res)=>{
    const {roleId}=req.params
    const {roleName,description}=req.body
    if(!roleName || !description){
        return res.status(400).json({message:"All fields required"})
    }
    try {
        const result = await updateRoleModel(roleId,roleName,description)
        return res.status(200).json({message:"Role updated",result})
    }catch (error) {
        return res.status(500).json({message:"Internal server error",error:error.message})
    }
}
export const deleteRole=async(req,res)=>{
    const {roleId}=req.params
    try {
        const result = await deleteRoleModel(roleId)
        return res.status(200).json({message:"Role deleted",result})
    }catch (error) {
        return res.status(500).json({message:"Internal server error",error:error.message})
    }
}
