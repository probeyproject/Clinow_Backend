import db from "../db/db.js"

export const addInvoiceModel=async(fullName,clinicName,invoiceNumber,issueDate,totalPayment,paymentMethod,paymentPayableAmount,logoUrl,contact)=>{
    try {
        
        const [result]=await db.query("insert into invoice (full_name,clinic_name,invoice_number,issue_date,total_payment,payment_method,patient_payable_amount,logo_url,contact) values (?,?,?,?,?,?,?,?,?)",[fullName,clinicName,invoiceNumber,issueDate,totalPayment,paymentMethod,paymentPayableAmount,logoUrl,contact])
        return result
    } catch (error) {
        throw new Error(`Error in Inserting Invoice`)
    }
}

export const getInvoiceModel=async()=>{
    try {
        const [result]=await db.query("select * from invoice")
        return result
    } catch (error) {
        throw new Error(`Error in fetching`)
    }
}

export const getInvoiceByIdModel=async(invoiceId)=>{
    try {
        const [result]=await db.query("select * from invoice where invoice_id=?",[invoiceId])
        return result
    } catch (error) {
        throw new Error(`Error in fetching`)
    }
}

export const updateInvoice=async(invoiceId,fullName,clinicName,invoiceNumber,issueDate,totalPayment,paymentMethod,paymentPayableAmount,logoUrl,contact)=>{
    try {
        
        const [result]=await db.query("update invoice set full_name=?,clinic_name=?,invoice_name=?,issue_date=?,total_payment=?,payment_method,patient_payable_amount=?,logo_url=?,contact=? where invoice_id=?",[fullName,clinicName,invoiceNumber,issueDate,totalPayment,paymentMethod,paymentPayableAmount,logoUrl,contact,invoiceId])
        return result

    } catch (error) {
        throw new Error(`Error in updating`)
    }
}

export const deleteInvoice=async(invoiceId)=>{
    try {
        const [result]=await db.query("delete from invoice where invoice_id=?",[invoiceId])
        return result
    } catch (error) {
        throw new Error(`Error in Deleting invoice`)
    }
}