import db from "../db/db.js"

export const createRoleModel = async (roleName,description) => {
  try {
    const [result] = await db.query("INSERT INTO roles (role_name,description) VALUES (?,?)", [
      roleName,description
    ]);
    return result;
  } catch (error) {
    throw new Error(`Error in creating role: ${error.message}`);
  }
};

export const getAllRoleModel = async () => {
  try {
    const [result] = await db.query("SELECT * FROM roles");
    return result;
  } catch (error) {
    throw new Error(`Error in getting roles: ${error.message}`);
  }
};

export const getRoleByIdModel = async (roleId) => {
  try {
    const [result] = await db.query("SELECT * FROM roles WHERE role_id = ?", [roleId]);
    return result;
  } catch (error) {
    throw new Error(`Error in getting role by ID: ${error.message}`);
  }
};

export const updateRoleModel = async (roleId, roleName, description) => {
  try {
    const [result] = await db.query("UPDATE roles SET role_name = ?, description = ? WHERE role_id = ?", [
      roleName,
      description,
      roleId,
    ]);
    return result;
  } catch (error) {
    throw new Error(`Error in updating role: ${error.message}`);
  }
};

export const deleteRoleModel = async (roleId) => {
  try {
    const [result] = await db.query("DELETE FROM roles WHERE role_id = ?", [roleId]);
    return result;
  } catch (error) {
    throw new Error(`Error in deleting role: ${error.message}`);
  }
};

export const getRoleIdByName=async(roleName)=>{
  try {
    const [result] = await db.query("SELECT role_id FROM roles WHERE role_name = ?", [roleName]);
    return result;
  } catch (error) {
    throw new Error(`Error in getting role by name: ${error.message}`);
  }
}