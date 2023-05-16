import mongoose from "mongoose";
const {Schema, Model} = mongoose;


const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
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
    phoneNumber: {
      type: Number,
      required: true,
      minLength: 8,
      maxLength: 15,
    },

    picture: {
      type: String,
    },
  },
  {
    collection: "users",
  }
);

 const User = mongoose.model('User', userSchema);
 export default User;


