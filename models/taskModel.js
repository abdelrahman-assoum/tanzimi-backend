import mongoose from "mongoose";
const { Schema } = mongoose;
import User from "./userModel.js";
import Label from "./labelModel.js";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    duration: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "In-Progress", "Completed"],
    },
    priority: {
      type: String,
      required: true,
      enum: ["Low", "Medium", "High"],
    },
    isPomodoro: {
      type: Boolean,
      required: true,
      default: false,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    labels: [
      {
        type: Schema.Types.ObjectId,
        ref: "Label",
      },
    ],
  },
  {
    collection: "tasks",
    timestamps: true,
  }
);

taskSchema.pre(["find", "findOne", "findOneAndUpdate", "save"], function () {
  this.populate({ path: "user", model: User, select: "-email -password" });
  this.populate({ path: "labels", model: Label });
}); 

const Task = mongoose.model("Task", taskSchema);
export default Task;
