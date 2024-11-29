import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userExistModel,userExistModelByPhone } from '../../models/auth.model.js';
import { getPatientByUserIdModel } from '../../models/patient.model.js';

export const login = async (req, res) => {
    try {
        let result;
        const { phone,email, password } = req.body;
        if(email){
         result = await userExistModel(email)
        }
        if(phone){
         result = await userExistModelByPhone(phone)
        }
        if (result[0].status == "inactive") {
            return res.status(400).json({ message: "Your account is inactive" })
        }
        if (result.length != 0) {
            const user = result[0];
            const hash = user.password;
            const patients= await getPatientByUserIdModel(user.user_id)
            const patientId=patients[0].patient_id
            bcrypt.compare(password, hash, function (err, result) {
                if (err) {
                    console.log(err)
                    return res.status(500).json({ message: "Something wrong in comparing" })
                } else {
                    if (result) {
                        const token = jwt.sign(
                            { id: user.user_id, email: user.email, role: user.role_name },
                            process.env.JWT_SECRET_KEY,
                            { expiresIn: '1h' }
                        );

                        let profileImageUrl = user.profile_url || null;
                        delete user.password;
                        return res.cookie('accessToken', token, {
                            httpOnly: true,
                            sameSite:"None",
                            secure: true,
                        }).status(200).json({   
                            message: 'Login successful',
                            user: {
                                id: user.user_id,
                                email: user.email,
                                role: user.role_name,
                                profileImageUrl,
                                name: `${user.first_name} ${user.middle_name} ${user.last_name}`,
                                phone: user.phone_number,
                                patientId:patientId
                            }
                        })
                    } else {
                        return res.status(400).json({ message: "Invalid Crediential" })
                    }
                }
            });
        } else {
            return res.status(400).json({ message: "User not registered" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

export const adminPanelLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const users = await userExistModel(email)
        const user = users[0];
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        if (user.status == "inactive") {
            return res.status(400).json({ message: "Your account is inactive" })
        }

        if (user && user.role_name === 'admin' || user.role_name === 'doctor' || user.role_name === 'receptionist') {

            if (await bcrypt.compare(password, user.password)) {
                const token = jwt.sign({ id: user.user_id, role: user.role_name }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
                let profileImageUrl = user.profile_url || null;
                delete user.password;
                return res.cookie('accessToken', token, {
                    httpOnly: true,
                }).status(200).json({
                    message: 'Login successful',
                    user: {
                        id: user.user_id,
                        email: user.email,
                        role: user.role_name,
                        profileImageUrl,
                        name: `${user.first_name} ${user.middle_name} ${user.last_name}`
                    }
                })
            } else {
                return res.status(400).json({ message: "Wrong Credentials" });
            }
        }

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}