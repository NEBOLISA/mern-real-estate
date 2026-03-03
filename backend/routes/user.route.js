import express from 'express';


import { deleteUser, getUser, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/verify.js';


const router = express.Router();

// Create a new user

router.get("/me", verifyToken, getUser)
router.put("/me/update-user", verifyToken, updateUser)
router.delete("/me/delete", verifyToken, deleteUser)


export default router