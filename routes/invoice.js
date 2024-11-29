import express from 'express';


import { addInvoice, getInvoice, getInvoiceById, updateInvoice , deleteInvoice} from '../controllers/invoiceModule/invoice.controller.js';
const router=express.Router()

router.post('/addInvoice',addInvoice)
router.get('/getInvoice',getInvoice)
router.get('/getInvoiceById/:invoiceId',getInvoiceById)
router.put('/updateInvoice/:invoiceId',updateInvoice)
router.delete('/deleteInvoice/:invoiceId',deleteInvoice)


export default router;