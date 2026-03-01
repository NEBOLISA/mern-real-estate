import express from 'express';
import {  googleAuth, signIn, signOut, signUp } from '../controllers/auth.controller.js';


const router = express.Router()

router.post("/sign-up", signUp)
router.post("/sign-in", signIn)
router.post("/google",googleAuth)

router.post("/logout", signOut)
export default router