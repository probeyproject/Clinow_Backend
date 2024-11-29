import { addMedicalReportModel, getAllMedicalReport, getMedicalReportById, getMedicalReportsByPatientId, updateMedicalReport, deleteMedicalReportModel } from "../../models/medicalReports.model.js"
import fs from "fs"
import path from "path"
import cloudinary from "../../config/cloudinary.js"
import { getPatientByIdModel, getUserByPatientIdModel } from "../../models/patient.model.js"
import { addNotificationModel} from "../../models/notification.model.js"


export const 
addReports=async(req,res)=>{
    const patientId=req.params.patientId
    const {reportType,symptoms,notes,testDate,hospitalName}=req.body
    const files=req.files
    if(!patientId){
        return res.status(400).json({message:"Id not received"})
    }
    if(!reportType||!symptoms||!notes||!testDate||!hospitalName){
        return res.status(400).json({message:"All fields required"})
    }
    if(!files){
        return res.status(400).json({message:"File not received"})
    }

    try {
        
        const patient=await getPatientByIdModel(patientId)
        if(patient.length===0){
            return res.status(400).json({message:"No patient found"})
        }
        const uploadedFiles = [];

        for (const file of files) {
          const uploadResult = await cloudinary.uploader.upload(file.path, {
            resource_type: "auto",
            folder: "/medical_reports",
          });
          fs.unlinkSync(file.path)
          uploadedFiles.push(uploadResult.secure_url); 
        }
        
        const user=await getUserByPatientIdModel(patientId)
        const userId=user[0].user_id
        const username=`${user[0].first_name} ${user[0].middle_name?user[0].middle_name:""} ${user[0].last_name}`

        const message=`Hey ${username},Your ${reportType} has been uploaded.Take a look. `

        const type='alert'

        const notification= await addNotificationModel(userId,message,type)

        console.log(uploadedFiles , typeof(uploadedFiles))

        const result= await addMedicalReportModel(patientId,reportType,uploadedFiles,symptoms,notes,testDate,hospitalName)

        return res.status(200).json({message:"Report submitted successful"})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error.message})
    }
}

export const getAllReports =async(req,res)=>{
    try {
        const reports= await getAllMedicalReport()
        return res.status(200).json({message:"Report fetch successful",reports})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const getReportById=async(req,res)=>{
    const reportId=req.params.reportId
    
    if(!reportId){
        return res.status(400).json({message:"Id not received"})
    }
    try {
        const report=await getMedicalReportById(reportId)
        return res.status(200).json({message:"Fetch successful",report})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const getReportByPatientId=async(req,res)=>{
    const patientId=req.params.patientId
    if(!patientId){
        return res.status(400).json({message:"Id not received"})
    }
    try {
        const report=await getMedicalReportsByPatientId(patientId)
        return res.status(200).json({message:"Fetch successful",report})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }  
}

export const updateReportById=async(req,res)=>{
    const reportId=req.params.reportId
    const{reportType,symptoms,notes,hospitalName,testDate}=req.body;
    if(!reportId){
        return res.status(400).json({message:"Id not received"})
    }
    const files=req.files

    try {
        const report=await getMedicalReportById(reportId)
        if(report.length===0){
            return res.status(400).json({message:"No report found"})
        }
        let existingFiles = report[0].file_path || []; 
        const uploadedFiles = [];

        
        if (files && files.length > 0) {
            for (const file of files) {
                const uploadResult = await cloudinary.uploader.upload(file.path, {
                    resource_type: "auto",
                    folder: "/medical_reports",
                });
                fs.unlinkSync(file.path);  
                uploadedFiles.push(uploadResult.secure_url);  
            }
        }
        const updatedFiles = uploadedFiles.length > 0 ? JSON.stringify(uploadedFiles) : existingFiles;

        const result=updateMedicalReport(reportId,reportType,JSON.stringify(symptoms),updatedFiles,notes,hospitalName,testDate)
        return res.status(200).json({message:"Report Updated successful"})
        
    } catch (error) {
        return res.status(200).json({message:error.message})
    }
}

export const deleteReportById=async(req,res)=>{
    const reportId=req.params.reportId
    if(!reportId){
        return res.status(400).json({message:"Id not received"})
    }
    try {
        const report=await getMedicalReportById(reportId)
        if(report.length===0){
            return res.status(400).json({message:"No report found"})
        }
        const result=await deleteMedicalReportModel(reportId)
        return res.status(200).json({message:"Report deleted successful"})
    } catch (error) {
        return res.status(200).json({message:error.message})
    }
}