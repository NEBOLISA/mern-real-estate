import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { errorHandler } from "../utils/error.js"
import e from "express"
export const signUp = async (req, res, next) => { 
    const { name, email, password } = req.body
    try {
        
        if (!name || !email || !password) {
           throw errorHandler(400, "All fields are required")
        }
       const userExists = await User.findOne({ email })
        if (userExists) {
           throw  errorHandler(400, "User already exists")
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