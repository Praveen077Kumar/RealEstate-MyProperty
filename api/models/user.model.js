import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username:{
        type: 'string',
        required: true,
        unique: true
    },
    email:{
        type: 'string',
        unique: true
    },
    password:{
        type: 'string',
        required: true
    },
    avatar:{
        type: 'string',
        default:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1200px-Circle-icons-profile.svg.png'
    },
},{timestamps: true});


const User = mongoose.model('User',userSchema);
export default User;