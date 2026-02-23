import express from 'express';


import { getUser } from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/verify.js';


const router = express.Router();

// Create a new user

router.get("/me", verifyToken, getUser)


export default router