import mongoose from "mongoose";
const {Schema, Model} = mongoose;

const labelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
      min: 3,
      max: 6,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    collection: "labels",
  }
);

labelSchema.pre(["find", "findOne"], function () {
  this.populate(["user_id"]);
});

const Label = Model("Label", labelSchema)
