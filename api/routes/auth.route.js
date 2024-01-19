import express from 'express';
import { signin, signup } from '../controllers/auth.controller.js';
import bcryptjs from 'bcryptjs';

const router = new express.Router();

router.post('/signup',signup)
router.post('/signin',signin)


export default router;