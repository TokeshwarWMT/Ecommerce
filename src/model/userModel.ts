import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    fName: String,
    lName: String,
    mobile: Number,
    email: String,
    password: String,
    address: {
        street: String,
        pincode: Number
    }
});

const User = mongoose.model('User', userSchema);
export default User;