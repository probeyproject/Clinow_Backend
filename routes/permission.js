import express from "express";
import { addPermission, deletePermission, getPermission, getPermissionByFeatureId, getPermissionById, getPermissionByRoleId, updatePermission } from "../controllers/permissionModule/permission.controller.js";

const router = express.Router();

router.post("/addPermission",addPermission)
router.get("/getPermission",getPermission)
router.get("/getPermissionById/:permissionId",getPermissionById)
router.get("/getPermissionByRoleId/:roleId",getPermissionByRoleId)
router.get("/getPermissionByFeatureId/:featureId",getPermissionByFeatureId)
router.put("/updatePermission/:permissionId",updatePermission)
router.delete("/deletePermission/:permissionId",deletePermission)


export default router;