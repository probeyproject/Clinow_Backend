import db from "../db/db.js";

export const addPermissionModel=async(roleId,featureId,canCreate,canRead,canUpdate,canDelete)=>{
    try {
        const result=await db.query(`INSERT INTO permissions(role_id,feature_id,can_create,can_read,can_update,can_delete) VALUES(?,?,?,?,?,?)`,[roleId,featureId,canCreate,canRead,canUpdate,canDelete])
    } catch (error) {
        throw new Error(`Error in adding permission ${error.message}`);
    }
}

export const getPermissionModel=async()=>{
    try {
        const [result]=await db.query("SELECT permissions.*,roles.role_name,features.feature_name FROM permissions join roles on roles.role_id=permissions.role_id join features on features.feature_id=permissions.feature_id");
        return result;
    } catch (error) {
        throw new Error(`Error in getting permission ${error.message}`);
    }
}

export const getPermissionModelById=async(permissionId)=>{
    try {
        const [result]=await db.query("SELECT permissions.*,roles.role_name,features.feature_name FROM permissions join roles on roles.role_id=permissions.role_id join features on features.feature_id=permissions.feature_id WHERE permission_id = ?",[permissionId]);
        return result;
    } catch (error) {
        throw new Error(`Error in getting permission ${error.message}`);
    }
}

export const updatePermissionModel=async(permissionId,roleId,featureId,canCreate,canRead,canUpdate,canDelete)=>{
    try {
        const [result]=await db.query("UPDATE permissions SET role_id = ?,feature_id = ?,can_create = ?,can_read = ?,can_update = ?,can_delete = ? WHERE permission_id = ?",[roleId,featureId,canCreate,canRead,canUpdate,canDelete,permissionId]);
        return result;
    } catch (error) {
        throw new Error(`Error in updating permission ${error.message}`);
    }
}

export const deletePermissionModel=async(permissionId)=>{
    try {
        const [result]=await db.query("delete from permissions where permission_id=?",[permissionId])
        return result
    } catch (error) {
        throw new Error(`Error in deleting permission ${error.message}`);
    }
}

export const getPermissionModelByRoleId=async(roleId)=>{
    try {
        const [result]=await db.query("SELECT permissions.*,roles.role_name,features.feature_name FROM permissions join roles on roles.role_id=permissions.role_id join features on features.feature_id=permissions.feature_id WHERE permissions.role_id = ?",[roleId]);
        return result;
    } catch (error) {
        throw new Error(`Error in getting permission ${error.message}`);
    }
}

export const getPermissionModelByFeatureId=async(featureId)=>{
    try {
        const [result]=await db.query("SELECT permissions.*,roles.role_name,features.feature_name FROM permissions join roles on roles.role_id=permissions.role_id join features on features.feature_id=permissions.feature_id WHERE permissions.feature_id = ?",[featureId]);
        return result;
    } catch (error) {
        throw new Error(`Error in getting permission ${error.message}`);
    }
}