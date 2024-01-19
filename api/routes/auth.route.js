import express from 'express';
import { signup } from '../controllers/auth.controller.js';
import bcryptjs from 'bcryptjs';

const router = new express.Router();

router.post('/signup',signup)


export default router;