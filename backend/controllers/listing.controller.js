import Listing from "../models/listing.model.js"
import { errorHandler } from "../utils/error.js"
import cloudinary from '../config/cloudinaryConfig.js'
export const createListing = async(req, res, next) => {
    try {
        const userId = req.userId
        if (!userId) {
            throw errorHandler(401, "Unauthorized")
        }
        
        const { name, description, address, sellOrRent, furnished, parkingSpot, offer, beds, baths, regularPrice, discountedPrice } = req.body
      
          if (!name || !address || !regularPrice || !req.file) {
            throw errorHandler(
              400,
              'Name, address, regular price and image are required'
            )
          }
        const result = await cloudinary.uploader.upload_stream({ folder: 'listings' }, async (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error)
            return next(errorHandler(500, 'Image upload failed'))
          }
          const imageUrl = result.secure_url
          const publicId = result.public_id
         
            const newListing = new Listing({
              user: userId,
              name,
              description,
              address,
              sellOrRent,
              furnished,
              parkingSpot,
              offer,
              beds,
              baths,
              regularPrice,
              discountedPrice,
              imageUrl,
              imagePublicId: publicId
            })
            await newListing.save()
            res.status(201).json({ success: true, message: "Listing created successfully", listing: newListing })
        //   } catch (err) {
        //     console.error('Database save error:', err)
        //     return next(errorHandler(500, 'Failed to create listing'))
        //   }
        })
        result.end(req.file.buffer)
      
     
            
    } catch (error) {
        
        next(error)
    }
 
}
export const getListings = (req, res) => {
  res.status(200).json({ message: "Listings retrieved successfully" })
}
export const getListing = (req, res) => {
  res.status(200).json({ message: "Listing retrieved successfully" })
}
export const updateListing = (req, res) => {
  res.status(200).json({ message: "Listing updated successfully" })
}
export const deleteListing = (req, res) => {
  res.status(200).json({ message: "Listing deleted successfully" })
}