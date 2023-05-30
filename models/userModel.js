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
      minlength: [8, "Password should be at least 8 characters"],
    },
    phoneNumber: {
      type: Number,
      required: true,
      min: [10000000, "Phone number should be at least 8 digits"],
      max: [999999999999999, "Phone number should be at most 15 digits"],
    },

    picture: String,
  },
  {
    collection: "users",
  }
);

 const User = mongoose.model('User', userSchema);
 export default User;


