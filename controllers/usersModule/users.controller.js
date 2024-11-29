import { getRoleIdByName } from "../../models/roles.model.js";
import { addUserModel, getUserByIdModel, getUsersModel, updateUserModel, deleteUserModel, updateStatusModel, getAllUserWithoutPatientModel, getReceptionistModel } from "../../models/users.model.js";
import cloudinary from "../../config/cloudinary.js";
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import Jimp from "jimp";
import { error } from "console";
const saltRound=process.env.SALT_ROUND||10;

export const addUser = async(req,res)=>{
    const {  firstName,middleName,lastName,email,phone,gender,roleName,password,date_of_birth,address}=req.body;
    const profilePic = req.file;

    const role=await getRoleIdByName(roleName)
    if (!firstName || !lastName || !password || !gender || !roleName) {
        return res.status(400).json({ message: "All fields required" });
      }
      
    if (role.length === 0) {
        return res.status(400).json({ message: "Invalid role" });
      }

    try{
        let profileUrl;
    if (profilePic) {
      const profileImagePath = profilePic.path;
      const compressedImagePath = path.join("compressImage", `${Date.now()}-compressed.jpg`);

      // Compress the image using Jimp
    const image = await Jimp.read(profileImagePath);
    await image
      .resize(256, Jimp.AUTO) // Resize to width 800px, auto-adjust height
      .quality(80) // Set JPEG quality to 50%
      .writeAsync(compressedImagePath); // Save the compressed image

      const cloudinaryResult = await cloudinary.uploader.upload(compressedImagePath, {
        folder: "profile_image",
        public_id: `${Date.now()}-${path.basename(compressedImagePath)}`, // Unique filename
      });

      profileUrl = cloudinaryResult.secure_url;
          // Delete the local original file with a slight delay
    fs.unlinkSync(profileImagePath)
    fs.unlinkSync(compressedImagePath)
    }

        const hashPassword = await bcrypt.hash(password, parseInt(saltRound));
        const result=await addUserModel(firstName,middleName,lastName,email,phone,gender,role[0].role_id,profileUrl,hashPassword,date_of_birth,address)
        return res.status(200).json({message:"User added successfully"})
    }catch(err){
        return res.status(500).json({message:err.message})
    }

}

export const getUsers = async(req,res)=>{
    try{
        const result=await getUsersModel()
        result.forEach(user=>delete user.password)
        return res.status(200).json({message:"Users fetched successfully",data:result})
    }catch(err){
        
        return res.status(500).json({message:"Something went wrong"})
    }
}

export const getUserById = async(req,res)=>{
    const userId=req.params.id
    try{
        const result=await getUserByIdModel(userId)
        delete result[0].password
        return res.status(200).json({message:"User fetched successfully",data:result})
    }catch(err){
        console.log(err)

        return res.status(500).json({message:"Something went wrong"})
    }
}

export const updateUser = async(req,res)=>{
    const userId=req.params.id
    const {firstName,middleName,lastName,email,phone,gender,roleName,status,date_of_birth,address}=req.body
    
    const profilePic = req.file;
    const role=await getRoleIdByName(roleName)

    if (role.length === 0) {
        return res.status(400).json({ message: "Invalid role" });
      }
      const role_id=role[0].role_id
    if (!firstName || !lastName || !email|| !phone || !gender || !roleName) {
        return res.status(400).json({ message: "All fields required" });
      }
    if(!status){
        status='active'
    }
    try {
        
        const result = await getUserByIdModel(userId);
        const user = result[0];
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        let profileUrl=user.profile_url;
        if (profilePic) {
            const profileImagePath = profilePic.path;
            const compressedImagePath = path.join("compressImage", `${Date.now()}-compressed.jpg`);
            const image = await Jimp.read(profileImagePath);
            await image .resize(256, Jimp.AUTO) // Resize to width 800px, auto-adjust height
            .quality(80) // Set JPEG quality to 50%
            .writeAsync(compressedImagePath); // Save the compressed image
            const cloudinaryResult = await cloudinary.uploader.upload(compressedImagePath, {
                folder: "profile_image",
                public_id: `${Date.now()}-${path.basename(compressedImagePath)}`, // Unique filename
            })
            profileUrl = cloudinaryResult.secure_url;
            fs.unlinkSync(profileImagePath)
            fs.unlinkSync(compressedImagePath)
        }
        await updateUserModel(userId,firstName,middleName,lastName,email,phone,gender,role_id,profileUrl,date_of_birth,address);

        return res.status(200).json({ message: "User updated successfully" });
        }
     catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteUser = async(req,res)=>{
    const userId=req.params.id
if(!userId){
        return res.status(400).json({message:"User id is required"})
    }
    try{
        const result=await deleteUserModel(userId)
        return res.status(200).json({message:"User deleted successfully"})
    }catch(err){
        
        return res.status(500).json({message:"Something went wrong"})
    }
}

export const updateStatus=async(req,res)=>{
    const userId=req.params.userId
    const {status}=req.body
    if(!status){
        return res.status(400).json({message:"Status is required"})
    }
    try{
        const result=await updateStatusModel(userId,status)
        return res.status(200).json({message:"Status updated successfully"})
    }catch(err){
        return res.status(500).json({message:"Something went wrong"})
    }
}

export const getAllUsersExceptPatient=async(req,res)=>{
    try {
        const users=await getAllUserWithoutPatientModel()
        return res.status(200).json({message:"Fetch Successful",users})
    } catch (error) {
        return res.status(500).json({message:"Server error"})
    }
}

export const getReceptionist=async(req,res)=>{
    try {
        const users=await getReceptionistModel()
        return res.status(200).json({message:"Fetch Successful",users})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Server error",error})
    }
}