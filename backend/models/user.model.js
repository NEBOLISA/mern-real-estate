import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    avatar: {
      type: String
    },
    password: {
      type: String,
      required: false
    },
    provider: {
      type: String,
      enum: ['local', 'google'],
      required: true
    },
    providerId: {
      type: String, 
      required: false
    }
  },
  { timestamps: true }
)

const User = mongoose.model("User", userSchema)

export default User