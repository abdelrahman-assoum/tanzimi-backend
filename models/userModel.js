import mongoose, { Collection } from "mongoose";
const {Schema, Model} = mongoose;


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    picture: {
        type: String,
        required: true,
    }
}, {
       Collection: 'users',
 });

 const User = mongoose.model('User', userSchema);
 export default User;


