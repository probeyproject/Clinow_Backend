import { getRoleByIdModel, getRoleIdByName } from "../../models/roles.model.js"
import { addPermissionModel, deletePermissionModel, getPermissionModel, getPermissionModelByFeatureId, getPermissionModelById, getPermissionModelByRoleId, updatePermissionModel } from "../../models/permission.model.js"
import { getFeatureByIdModel } from "../../models/features.model.js"

export const addPermission=async(req,res)=>{

    const {roleId,featureId,canCreate,canRead,canUpdate,canDelete}=req.body
    try {
        const roleExist=await getRoleByIdModel(roleId)
        if(roleExist.length===0){
            return res.status(400).json({message:"Role not exist"})
        }
        const featureExist=await getFeatureByIdModel(featureId)
        if(featureExist.length===0){
            return res.status(400).json({message:"Feature not exist"})
        }
        const result=await addPermissionModel(roleId,featureId,canCreate,canRead,canUpdate,canDelete)
        res.status(200).json({message:"Permission added successfully"})
    }catch(error) {
        res.status(500).json({message:"Internal server error",error:error.message})
    }
}

export const getPermission=async(req,res)=>{
    try {
        const result=await getPermissionModel()
        res.status(200).json({message:"Permission fetched successfully",data:result})
    } catch (error) {
        res.status(500).json({message:"Internal server error",error:error.message})
    }
}

export const getPermissionById=async(req,res)=>{
    const {permissionId}=req.params
    try {
        const result=await getPermissionModelById(permissionId)
        res.status(200).json({message:"Permission fetched successfully",data:result})
    } catch (error) {
        res.status(500).json({message:"Internal server error",error:error.message})
    }
}

export const updatePermission=async(req,res)=>{
    const {permissionId}=req.params
    const {roleName,featureName,canCreate,canRead,canUpdate,canDelete}=req.body
    try {
        const roleExist=await getRoleIdByName(roleName)
        if(roleExist.length===0){
            return res.status(400).json({message:"Role not exist"})
        }
        const roleId=roleExist[0].role_id
        const featureExist=await getFeatureIdByName(featureName)
        if(featureExist.length===0){
            return res.status(400).json({message:"Feature not exist"})
        }
        const featureId=featureExist[0].feature_id
        const result=await updatePermissionModel(permissionId,roleId,featureId,canCreate,canRead,canUpdate,canDelete)
        res.status(200).json({message:"Permission updated successfully"})
    } catch (error) {
        res.status(500).json({message:"Internal server error",error:error.message})
    }
}

export const deletePermission=async(req,res)=>{
    const {permissionId}=req.params
try {
        const result=await deletePermissionModel(permissionId)
        res.status(200).json({message:"Permission deleted successfully"})
    } catch (error) {
        res.status(500).json({message:"Internal server error",error:error.message})
    }
}

export const getPermissionByRoleId=async(req,res)=>{
    const {roleId}=req.params
    try{
        const result=await getPermissionModelByRoleId(roleId)
        res.status(200).json({message:"Permission fetched successfully",data:result})
    }catch(error){
        res.status(500).json({message:"Internal server error",error:error.message})
    }
}

export const getPermissionByFeatureId=async(req,res)=>{
    const {featureId}=req.params
    try{
        const result=await getPermissionModelByFeatureId(featureId)
        res.status(200).json({message:"Permission fetched successfully",data:result})
    }catch(error){
        res.status(500).json({message:"Internal server error",error:error.message})
    }
}