import mongoose from "mongoose";
import User from "./userModel.js";
const { Schema } = mongoose;

const labelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 6,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    collection: "labels",
  }
);

labelSchema.pre(["find", "findOne", "findOneAndUpdate", "save"], function () {
  this.populate({ path: "user", model: User, select: "-email -password" }); // Exclude the email and password fields
});

const Label = mongoose.model("Label", labelSchema);
export default Label;
