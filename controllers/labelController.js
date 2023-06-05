import mongoose from "mongoose";
import Label from "../models/labelModel.js";
import User from "../models/userModel.js";

export const getLabels = async (req, res, next) => {
  try {
    const labels = await Label.find({});
    if (labels.length === 0) {
      return res.status(404).json({ error: "No labels found" });
    }
    if (labels) {
      res.status(200).json(labels);
    }
  } catch (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
  }
};
export const getUserLabel = async (req, res) => {
  let user = req.params.id;
  const userLabel = await Label.find({ user: user });

  if (userLabel.length > 0) {
    res.status(200).json({
      message: `${userLabel[0].user.firstName} ${userLabel[0].user.lastName} Labels`,
      userLabel,
    });
  } else if (userLabel.length === 0) {
    return res
      .status(200)
      .json({ message: "No `Label` Found", userLabel: [] });
  } else {
    return res.status(404).json({ error: "No Label found" });
  }
};

export const createLabel = async (req, res, next) => {
  try {
    let { name, color, user } = req.body;

    const checkUser = await User.findById(req.body.user);

    // check if the service does not exist#
    if (!checkUser) return res.json({ status: 404, message: "User not found" });

    let label = new Label({
      name,
      color,
      user,
    });
    if (label) {
      await label.save();
      res.status(201).json({ message: "Label created successfully", label });
    } else {
      return res.status(400).json({ error: "Label not created" });
    }
  } catch (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
  }
};

export const updateLabel = async (req, res, next) => {
  try {
    let id = req.params.id;
    if (req.body.user) {
      const checkUser = await User.findById(req.body.user);
      // check if the service does not exist#
      if (!checkUser)
        return res.json({ status: 404, message: "User not found" });
    }

    let update = {
      name: req.body.name,
      color: req.body.color,
      user: req.body.user,
    };

    const checkLabel = await Label.findById(id);

    if (!checkLabel) return res.status(404).json({ error: "Label Not Found" });

    let updatedlabel = await Label.findByIdAndUpdate(
      id,
      { $set: update },
      {
        new: true,
        runValidators: true, // Run validation and middleware (findoneandUpdate to populate the user)
      }
    );
    res
      .status(200)
      .json({ message: "Label updated successfully", updatedlabel });
  } catch (error) {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export const deleteLabel = async (req, res) => {
  try {
    let id = req.params.id;
    let label = await Label.findById(id);
    if (!label) {
      return res.status(404).json({ error: "Label not found" });
    } else {
      await Label.findByIdAndDelete(id);
      res.status(200).json({ message: "Label deleted successfully" });
    }
  } catch (error) {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};
