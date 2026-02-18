import { errorHandler } from "../utils/error"
import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return errorHandler(401, "Unauthorized")
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.id
        next()
    } catch (error) {
        next(error)
    }
}