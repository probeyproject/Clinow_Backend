import express from "express";
import { addUser, getUsers, getUserById, updateUser,deleteUser, updateStatus, getAllUsersExceptPatient, getReceptionist } from "../controllers/usersModule/users.controller.js";
import upload from "../config/multer.js";
import { changePassword } from "../controllers/usersModule/changePassword.controller.js";
import authenticate from "../middleware/authenticate.js";
import { checkFeaturePermission } from "../middleware/roleAndPermission.js";

const router = express.Router();

router.post("/adminPanel/addUser",upload.single("profilePic"),addUser);
router.get("/adminPanel/getUsers", getUsers);
router.get("/adminPanel/getUserById/:id", getUserById);
router.put("/adminPanel/updateUser/:id", upload.single("profilePic"), updateUser);
router.delete("/adminPanel/deleteUser/:id",deleteUser);
router.post("/changePassword/:id", changePassword);
router.post("/adminPanel/updateStatus/:userId",updateStatus)
router.get("/adminPanel/getAllUserExpectPatient",getAllUsersExceptPatient)
router.get("/getReceptionist",getReceptionist)

export default router;  
