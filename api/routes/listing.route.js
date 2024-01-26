import express from 'express';
import  {createListing}  from '../controllers/listing.controller.js';
import { varifyToken } from '../utils/userVarify.js';

const router = express.Router()



router.post('/create',varifyToken,createListing)


export default router;