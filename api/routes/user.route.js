import express from 'express';
import { updateUser, user } from '../controllers/user.controller.js';
import { varifyToken } from '../utils/userVarify.js';

const router = express.Router()

router.get('/test',user);
router.post('/update/:id', varifyToken, updateUser);



export default router;