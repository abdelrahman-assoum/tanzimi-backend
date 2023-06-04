import mongoose from "mongoose";
const { Schema } = mongoose;
import Task from "./taskModel.js";
import User from "./userModel.js";

const goalSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

goalSchema.pre(["find", "findOne", "save", "findOneAndUpdate"], function () {
  this.populate({ path: "user", model: User, select: "-email -password" }); // Exclude the email and password fields
  this.populate({
    path: "tasks",
    model: Task,
    select: "-description -labels -priority -duration -dueDate",
  });
});
const Goal = mongoose.model("Goal", goalSchema);

export default Goal;
