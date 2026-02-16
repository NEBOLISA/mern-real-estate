import express from 'express';


import { createUser } from '../controllers/user.controller.js';

const router = express.Router();

// Create a new user

router.get("/test", createUser)


export default router