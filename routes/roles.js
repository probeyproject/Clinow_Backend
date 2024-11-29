import express from "express"
import { createRole, getAllRole, getRoleById, updateRole, deleteRole } from "../controllers/rolesModule/roles.controller.js";

const router=express.Router()

router.post("/createRole",createRole)
router.get("/getAllRole",getAllRole)
router.get("/getRoleById/:userId",getRoleById)
router.put("/updateRole/:userId",updateRole)
router.delete("/deleteRole/:userId",deleteRole)

export default router