import express from 'express';
import { addNewsletter, deleteNewsletter, getNewsletter, getNewsletterById, updateNewsletter } from '../controllers/newsletterModule/newsletter.controller.js';
const router=express.Router()

router.post('/addNewsletter',addNewsletter)
router.get('/getNewsletter',getNewsletter)
router.get('/getNewsletterById/:newsletterId',getNewsletterById)
router.put('/updateNewsletter/:newsletterId',updateNewsletter)  
router.delete('/deleteNewsletter/:newsletterId',deleteNewsletter)


export default router;