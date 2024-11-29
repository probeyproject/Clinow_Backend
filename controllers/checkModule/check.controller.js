import jwt from "jsonwebtoken"
import { getUserByIdModel } from "../../models/users.model.js";
import { getPatientByUserIdModel } from "../../models/patient.model.js";



export const check=async(req,res)=>{
    try {
        // const token = req.header('Authorization').replace('Bearer ', '');
        const token=req.cookies.accessToken;
        if(!token){
          return res.status(400).json({message:"LogIn first"})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userId=decoded.id
        const user = await getUserByIdModel(userId)
        const patient=await getPatientByUserIdModel(userId)
        console.log(user)

        if(!user){
           return res.status(400).json({message:"User not exist"})
        }
        return res.status(200).json({
            user: {
                id: user[0].user_id,
                email: user[0].email,
                role: user[0].role_id,
                userRole: user[0].role_name,
                profileImageUrl:user[0].profile_url,
                name:`${user[0].first_name} ${user[0].middle_name} ${user[0].last_name}`,
                patientId:patient[0].patient_id
              }
    })
      } catch (error) {
        res.status(500).json({message:error.message})
      }
}