import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"

export const createUser =  (req, res) => { 
    res.json({ message: "User created successfully" })
}
export const getUser = async (req, res,next) => {
    try {
        const id = req.userId
     
        if (!id) {
            throw errorHandler(401, "Unauthorized")
        }
          
           const user = await User.findById(id)
           if (!user) {
             throw errorHandler(404, "User not found")
           }
         const { password: _, ...userData } = user._doc
        res.status(200).json({ user: userData })
    } catch (error) {
        
        next(error)
    }
 
}