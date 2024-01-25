import express from 'express';
import { updateUser, user,deleteUser } from '../controllers/user.controller.js';
import { varifyToken } from '../utils/userVarify.js';

const router = express.Router()

router.get('/test',user);
router.post('/update/:id', varifyToken, updateUser);
router.delete('/delete/:id', varifyToken, deleteUser);



export default router;