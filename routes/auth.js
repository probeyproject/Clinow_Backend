import express from "express";
import { signUp} from "../controllers/authModule/signup.controller.js";
import { adminPanelLogin, login } from "../controllers/authModule/login.controller.js";
import { check } from "../controllers/checkModule/check.controller.js";
import upload from "../config/multer.js";

const router = express.Router();

router.post("/signup", upload.single("profilePic"), signUp);
router.post("/login", login);
router.get("/logout", (req, res) => {
  res.clearCookie("accessToken");
  res.status(200).json({ message: "Logout successful" });
});
router.get("/check",check)

router.post("/adminPanel/login", adminPanelLogin);


export default router;