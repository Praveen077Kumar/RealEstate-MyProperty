import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('connected to MongoDb');
}).catch(err => console.log(err));

const app = express();
app.listen(3000,()=>{
    try {
        console.log('listening on port 3000')
    }
    catch (e) {
        console.error('error listening on port 3000', e);
    }
});