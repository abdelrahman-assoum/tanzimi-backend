import mongoose from "mongoose";
import User from "./userModel.js";
const { Schema } = mongoose;

const journalSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content:{
      type: String,
      required: true,
    },
    picture: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    collection: "journals",
    timestamps: true,
  }
);

journalSchema.pre(["find", "findOne", "save", "findOneAndUpdate"], function () {
  this.populate({ path: "user", model: User, select: "-email -password" }); // Exclude the email and password fields
})

const Journal = mongoose.model("Journal", journalSchema);
export default Journal;