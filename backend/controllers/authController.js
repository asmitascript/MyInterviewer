import bcrypt from 'bcrypt';

import User from "../models/user.js"


export const registerUser = async(req, res) =>{

    try{
        const {firstName, lastName, email, password} = req.body;

        const existingUser = await User.findOne({ email });

        if(existingUser){
            return res.status(409).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
        });


        res.status(400).json({
            message: "User successfully registered",

            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        });

    }catch(err){
        res.status(500).json({
            error: err.message,
            message: "Registration failed",
        })
    }
}