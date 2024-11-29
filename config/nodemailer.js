import nodemailer from "nodemailer";
import env from "dotenv";
env.config();

// Create a transporter object
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other services like 'yahoo', 'hotmail', etc.
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  
  // Function to send an email
export const sendVerificationEmail = async (email, token) => {
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Password Reset Verification',
      text: `You requested a password reset. Use the following code to reset your password: ${token}`,
      html: `<b>You requested a password reset. Use the following code to reset your password:</b> <p>${token}</p>`
    };
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
      } catch (error) {
        console.log(error)
        throw new Error(`Error in sending email: ${error.message}`);
      }
    };
