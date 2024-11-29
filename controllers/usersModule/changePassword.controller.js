import { getUserByEmailModel, updatePasswordModel,getUserByIdModel, insertResetModel } from "../../models/users.model.js";
import bcrypt from "bcrypt";
import { sendVerificationEmail } from "../../config/nodemailer.js";
import { ResetExpiryTimestamp } from "../../utils/updateTime.js";

export const changePassword = async (req, res) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const userId = req.params.id;

    if (!currentPassword || !newPassword || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: 'New password do not match' });
    }

    try {
        // Get user from database
        const result = await getUserByIdModel(userId);
        const user = result[0];

        if (result.length===0) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password in database
        await updatePasswordModel(userId, hashedPassword);

       return res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};

//reset password request

export const resetPasswordRequest = async (req, res) => {
    const userEmail = req.body.email;
    try {
        const user = await getUserByEmailModel(userEmail);
        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        const userId = user[0].id;
        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '15m' }
          );
          await sendVerificationEmail(userEmail,token)
          const ResetExpiry=ResetExpiryTimestamp()
          await insertResetModel(userId, token, ResetExpiry);
          return res.status(200).json({ message: 'Password reset link sent to your email' });

    }catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

//reset password
export const resetPassword=async(req,res)=>{
    const {token,newPassword} =req.body;
    if(!token,!newPassword){
       return res.status(400).json({message:"All fields require"})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    await updatePasswordModel(decoded.userId, hashedPassword);
    
       return res.status(200).json({ message: 'Password has been reset' });
      } catch (error) {
        return res.status(500).json({message:error})
      }
}