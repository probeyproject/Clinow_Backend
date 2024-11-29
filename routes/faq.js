import express from "express";
import { addFaq, deleteFaqById, getAllActiveFaq, getAllFaq, getFaqById, updateFaqById } from "../controllers/FAQModule/faq.controller.js";

const router = express.Router();

router.post("/addFaq", addFaq);
router.get("/getAllFaq", getAllFaq);
router.get("/getFaqById/:faqId", getFaqById);
router.put("/updateFaqById/:faqId", updateFaqById);
router.delete("/deleteFaqById/:faqId", deleteFaqById);
router.get("/gettAllActiveFaq", getAllActiveFaq)

export default router;