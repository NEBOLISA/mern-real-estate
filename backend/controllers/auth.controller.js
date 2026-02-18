import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { errorHandler } from "../utils/error.js"
import jwt from "jsonwebtoken"
export const signUp = async (req, res, next) => { 
    const { name, email, password } = req.body
    try {
        
        if (!name || !email || !password) {
           throw errorHandler(400, "All fields are required")
        }
       const userExists = await User.findOne({ email })
        if (userExists) {
           throw  errorHandler(400, "User already exists, please login")
       }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })
        await newUser.save()
        res.status(201).json({ message: "User created successfully" })
    }
   
     catch (error) {
        next(error)
    }
}

export const signIn = async (req, res, next) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            throw errorHandler(400, "All fields are required")
        }
        const user = await User.findOne({ email })
        if (!user) {
            throw errorHandler(404, "User not found, please sign up")
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            throw errorHandler(400, "Invalid credentials")
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
        const {password: _, ...userData} = user._doc
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        }).status(200).json({ message: "User signed in successfully",user: userData })
        //res.status(200).json({ message: "User signed in successfully" })
    } catch (error) {
        next(error)
    }
}