import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true,
        unique: true, 
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String, 
        required: [true , "password is required"],
        min: [6 , "password must contain atleast 6 digits"],
        max: 12
    }
}, 
{
    timestamps: true
});

export default User = mongoose.model("User" , userSchema);