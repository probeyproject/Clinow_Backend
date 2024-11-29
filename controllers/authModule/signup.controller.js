import cloudinary from "../../config/cloudinary.js";
import fs from "fs";
import path from "path";
import { signupModel, userExistModel } from "../../models/auth.model.js";
import bcrypt from "bcrypt";  // Import bcrypt for password hashing
import Jimp from "jimp";
import { addPatientDetailModel } from "../../models/patient.model.js";
const saltRound = process.env.SALT_ROUND || 10;

export const signUp = async (req, res) => {
  const { firstName, middleName, lastName, email, password,phone,gender,date_of_birth,address,emergency_contact,blood_group,allergies,medical_history,height,weight,bmi,glucose_level,bp_systolic,bp_diastolic,sugar_level} = req.body;
  
  const profilePic = req.file;
  
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }
  if (!profilePic) {
    return res.status(400).json({ message: "Profile image not uploaded" });
  }
  
  try {
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

    const userExist = await userExistModel(email);
    if (userExist.length === 0) {
      // Hashing password
      const hashPassword = await bcrypt.hash(password, parseInt(saltRound));

      // Inserting user
    const result=  await signupModel(firstName, middleName, lastName, email, hashPassword, profileUrl,phone,gender);
    const userId=result[0].user_id
    const fullName=`${firstName} ${lastName}`
    if(!userId){
      return res.status(500).json({message:"Something wrong"})
    }


    const patient =await addPatientDetailModel(userId,fullName,date_of_birth,gender,address,emergency_contact,blood_group,allergies,medical_history,height,weight,bmi,glucose_level,bp_systolic,bp_diastolic,sugar_level)

      return res.status(200).json({ message: "User registered" });
    } else {
      return res.status(400).json({ message: "User already registered. Try to log in." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
