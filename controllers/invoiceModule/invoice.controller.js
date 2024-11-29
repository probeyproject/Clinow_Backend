import { addInvoiceModel, getInvoiceByIdModel, getInvoiceModel } from "../../models/invoice.model.js"


export const addInvoice=async(req,res)=>{
    const {fullName,clinicName,invoiceNumber,issueDate,totalPayment,paymentMethod,paymentPayableAmount,contact}=req.body
    if(!fullName||!clinicName||!invoiceNumber||!issueDate||!totalPayment||!paymentMethod||!contact||paymentPayableAmount){
        return res.status(400).json({message:"All fields required"})
    }
    const logo=req.file
    if(!logo){
        return res.status(400).json({message:"Logo is required"})
    }
    try {

        const logoPath= logo.path
        const cloudinaryResult = await cloudinary.uploader.upload(logoPath, {
            folder: "invoice_logo",
            public_id: `${Date.now()}-${path.basename(logoPath)}`, 
          });
    
          logoUrl = cloudinaryResult.secure_url;
        fs.unlinkSync(logoPath)
        
        const result=await addInvoiceModel(fullName,clinicName,invoiceNumber,issueDate,totalPayment,paymentMethod,paymentPayableAmount,logoUrl,JSON.stringify(contact))

        return res.status(200).json({message:"Invoice Added successful"})

    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const getInvoice=async(req,res)=>{
    try {
        
        const result=await getInvoiceModel()
        return res.status(200).json({message:"Fetch Successful",result})

    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const getInvoiceById=async(req,res)=>{
    const invoiceId=req.params.invoiceId
    try {
        const result=await getInvoiceByIdModel(invoiceId)
        return res.status(200).json({message:"fetch successful",result})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const updateInvoice=async(req,res)=>{
    const invoiceId=req.params.invoiceId
    const {fullName,clinicName,invoiceNumber,issueDate,totalPayment,paymentMethod,paymentPayableAmount,contact}=req.body
    if(!fullName||!clinicName||!invoiceNumber||!issueDate||!totalPayment||!paymentMethod||!contact||paymentPayableAmount){
        return res.status(400).json({message:"All fields required"})
    }
    const logo=req.file
    try {
        const invoice=await getInvoiceByIdModel(invoiceId)
        let logoUrl=invoice[0].logo_url
        if(logo){
            const logoPath= logo.path
        const cloudinaryResult = await cloudinary.uploader.upload(logoPath, {
            folder: "invoice_logo",
            public_id: `${Date.now()}-${path.basename(logoPath)}`, 
          });
    
          logoUrl = cloudinaryResult.secure_url;
        fs.unlinkSync(logoPath)
    }
    const result=await updateInvoice(invoiceId,fullName,clinicName,invoiceNumber,issueDate,totalPayment,paymentMethod,paymentPayableAmount,logoUrl,JSON.stringify(contact))
    return res.status(200).json({message:"Invoice Updated Successful"})

    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const deleteInvoice=async(req,res)=>{
    const invoiceId=req.params.invoiceId
    if(!invoiceId){
        return res.status(400).json({message:"Invoice Id is required"})
    }
    try {
        const result=await deleteInvoice(invoiceId)
        return res.status(200).json({message:"Invoice Deleted Successful"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}