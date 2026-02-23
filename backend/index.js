import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config()

const app = express()
app.use(cookieParser())
app.use(express.json())
mongoose.connect(
  process.env.MONGO_URI
).then(() => {
    console.log("Connected to MongoDB!")
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error)
})

app.listen(3000, () => {
    console.log("Server running on port 3000!")
})


app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
)
app.use('/api/auth', authRouter)
app.use("/api/auth/user",userRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"
   return res.status(statusCode).json({success: false, statusCode, message })
})