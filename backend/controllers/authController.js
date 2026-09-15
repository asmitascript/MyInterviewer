import bcrypt from 'bcrypt';
import User from "../models/user.js";
import jwt from 'jsonwebtoken';


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

export const loginUser = async(req, res) =>{

   try{
     const { email, password } = req.body;

        const user = await User.findOne({ email });

        if(!user){
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const isPassword = await bcrypt.compare(password, user.password);

        if(!isPassword){
            return res.status(401).json({
                message: "Invalid email or password",
            })
        }

        // create jwt
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            },
        });
    }catch(err){
        res.status(500).json({
            message: "Login failed",
            error: err.message,
        })
    }

}

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
      error: err.message,
    });
  }
};