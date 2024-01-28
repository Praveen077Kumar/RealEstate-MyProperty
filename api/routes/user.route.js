import express from 'express';
import { updateUser, user,deleteUser, getUserListings} from '../controllers/user.controller.js';
import { varifyToken } from '../utils/userVarify.js';

const router = express.Router()

router.get('/test',user);
router.post('/update/:id', varifyToken, updateUser);
router.delete('/delete/:id', varifyToken, deleteUser);
router.get('/listings/:id', varifyToken, getUserListings );




export default router;