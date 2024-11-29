import express from 'express'
import { addReview, getReview, getReviewById, updateReviewStatus, deleteReview,getActiveReview } from '../controllers/reviewModule/review.controller.js'
const  router=express.Router()

router.post("/addReview",addReview)
router.get("/getReview",getReview)
router.get("/getReviewById/:reviewId",getReviewById)
router.put("/updateReviewStatus/:reviewId",updateReviewStatus)
router.delete("/deleteReview/:reviewId",deleteReview)
router.get("/getActiveReview",getActiveReview)


export default router