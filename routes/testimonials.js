import express from "express";
import upload from "../config/multer.js";
import { addTestimonial, deleteTestimonial, getActiveTestimonial, getTestinomialById, getTestimonials, updateTestinomial } from "../controllers/testimonialsModule/testimonial.controller.js";
const router=express.Router()

router.post('/addTestimonial',upload.single('file'),addTestimonial)
router.get('/getTestimonials',getTestimonials)
router.get('/getTestimonialById/:testimonialId',getTestinomialById)
router.get('/getActiveTestimonial',getActiveTestimonial)
router.put('/updateTestimonial/:testimonialId',upload.single('file'),updateTestinomial)
router.delete('/deleteTestimonial/:testimonialId',deleteTestimonial)


export default router