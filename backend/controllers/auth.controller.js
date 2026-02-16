import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
export const signUp = async (req, res) => { 
    const { name, email, password } = req.body
    try {
        
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
       const userExists = await User.findOne({ email })
       if (userExists) {
        return res.status(400).json({ message: "User already exists" })
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
        res.status(500).json({ message: error.message })
    }
}