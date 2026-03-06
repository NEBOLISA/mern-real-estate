import express from 'express'
import { verifyToken } from '../middleware/verifyTokenMiddleware.js'
import { createListing, deleteListing, getListing, getListings, updateListing } from '../controllers/listing.controller.js'
import multer from 'multer'
const router = express.Router()
const storage = multer.memoryStorage()
const upload = multer({ storage })
router.post("/", verifyToken, upload.single('imageUrl'), createListing)
router.get("/", getListings)
router.get("/:id", getListing)
router.put("/:id", verifyToken, updateListing)
router.delete("/:id", verifyToken, deleteListing)

export default router