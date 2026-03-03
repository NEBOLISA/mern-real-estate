import User from '../models/user.model.js'
import cloudinary from '../config/cloudinaryConfig.js'
import { errorHandler } from '../utils/error.js'
import bcrypt from 'bcryptjs'
export const createUser = (req, res) => {
  res.json({ message: 'User created successfully' })
}
export const getUser = async (req, res, next) => {
  try {
    const id = req.userId

    if (!id) {
      throw errorHandler(401, 'Unauthorized')
    }

    const user = await User.findById(id)
    if (!user) {
      throw errorHandler(404, 'User not found')
    }
    const { password: _, ...userData } = user._doc
    res.status(200).json({ user: userData })
  } catch (error) {
    next(error)
  }
}
export const updateUser = async (req, res,next) => {
  try {
      const id = req.userId
     
    if (!id) {
      throw errorHandler(401, 'Unauthorized')
    }
    const { name, email, password, avatar, publicId} = req.body
      const updatedData = {}
      const user = await User.findById(id)
      if (!user) {
        throw errorHandler(404, 'User not found')
      }
      if (user.avatarPublicId) {
          try {
           
          await cloudinary.uploader.destroy(user.avatarPublicId)
        } catch (err) {
          console.log('Old avatar deletion failed:', err.message)
        }
      }
    if (name) updatedData.name = name
      if (email) {
          if(user.provider !== "local") {
              throw errorHandler(400, "Email cannot be updated for social login users")
          }
          updatedData.email = email
      }
    if (password) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      updatedData.password = hashedPassword
    }
    if (avatar) updatedData.avatar = avatar
      if (publicId) updatedData.avatarPublicId = publicId
      
    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
      returnDocument: 'after'
    })
    res.status(200).json({message:"User updated successfully", user: updatedUser })
  } catch (error) {
    next(error)
  }
}
export const deleteUser = async (req, res, next) => {
  try {
    const id = req.userId
    if (!id) {
      throw errorHandler(401, 'Unauthorized')
    }
    const user = await User.findById(id)
    if (!user) {
      throw errorHandler(404, 'User not found')
    }
    if (user.avatarPublicId) {
      try {
        await cloudinary.uploader.destroy(user.avatarPublicId)
      } catch (err) {
        console.log('Avatar deletion failed:', err.message)
      }
    }
    await User.findByIdAndDelete(id)
      res
        .clearCookie('token', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        })
        .status(200)
        .json({ message: 'User deleted successfully' })
        
  } catch (error) {
    next(error)
  }
}
// export const updateAvatar = async (req, res, next) => {
//   try {
//     const id = req.userId
//     if (!id) {
//       throw errorHandler(401, 'Unauthorized, please login')
//     }
//     const { imageUrl, publicId } = req.body
//     if (!imageUrl || !publicId) {
//       throw errorHandler(400, 'Image data missing')
//     }
//     const user = await User.findById(id)

//     if (!user) {
//       throw errorHandler('404', 'User not found')
//     }
//     if (user.avatarPublicId) {
//       try {
//         await cloudinary.uploader.destroy(user.avatarPublicId)
//       } catch (err) {
//         console.log('Old avatar deletion failed:', err.message)
//       }
//     }
//     user.avatar = imageUrl
//     user.avatarPublicId = publicId
//     await user.save()
//     res
//       .status(200)
//       .json({ message: 'Avatar uploaded successfully', avatar: user.avatar })
//   } catch (error) {
//     next(error)
//   }
// }
