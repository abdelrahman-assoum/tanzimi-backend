import Task from "../models/taskModel.js";
import User from "../models/userModel.js";
import Label from "../models/labelModel.js";
import mongoose from "mongoose";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    if (tasks.length === 0)
      return res.status(404).json({ error: "No tasks found" });
    res.status(200).json(tasks);
  } catch (error) {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.status(200).json(task);
    if (!task) return res.status(404).json({ error: "Task not found" });
  } catch (error) {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};
export const getUserTasks = async (req, res) => {
  let user = req.params.id;
  const checkUser = await User.findById(user);
  if (!checkUser) return res.status(404).json({message: "User not found"});
  const userTasks = await Task.find({ user: user });
  if (userTasks.length > 0) {
    res.status(200).json({
      message: `${userTasks[0].user.firstName} ${userTasks[0].user.lastName} Tasks`,
      userTasks,
    });
  }
  else if (userTasks.length === 0) {
    return res.status(200).json({message: "No Tasks Found", userTasks: []})
  } else {
    return res.status(404).json({ error: "No Tasks found" });
  }
}
export const createTask = async (req, res) => {
  try {
    let {
      title,
      description,
      duration,
      status,
      priority,
      isPomodoro,
      dueDate,
      user,
      labels,
    } = req.body;

    const checkUser = await User.findById(user);
    if (!checkUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if label available
    if (req.body.labels) {
      const checkLabels = await Label.find({
        _id: { $in: req.body.labels },
      });

      if (checkLabels.length !== req.body.labels.length) {
        return res
          .status(404)
          .json({ error: "One of the label or all of them not found" });
      }
    }

    const task = new Task({
      title,
      description,
      duration,
      status,
      priority,
      isPomodoro,
      dueDate,
      user,
      labels,
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export const updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedFields = {};
    if (req.body.title) updatedFields.title = req.body.title;
    if (req.body.description) updatedFields.description = req.body.description;
    if (req.body.duration) updatedFields.duration = req.body.duration;
    if (req.body.status) updatedFields.status = req.body.status;
    if (req.body.priority) updatedFields.priority = req.body.priority;
    if (req.body.isPomodoro) updatedFields.isPomodoro = req.body.isPomodoro;
    if (req.body.dueDate) updatedFields.dueDate = req.body.dueDate;
    // Check if the user exist
    if (req.body.user) {
      const checkUser = await User.findById(req.body.user);
      if (!checkUser) {
        return res.status(404).json({ error: "User not found" });
      } else {
        updatedFields.user = req.body.user;
      }
    }
    if (req.body.labels) {
      // Check if label available

      const checkLabels = await Label.find({
        _id: { $in: req.body.labels },
      });

      // check if the labels exist
      if (checkLabels.length !== req.body.labels.length) {
        return res
          .status(404)
          .json({ error: "One of the label or all of them not found" });
      } else {
        updatedFields.labels = req.body.labels;
      }
    }

    const editTask = { ...req.body, ...updatedFields };

    const editedTask = await Task.findByIdAndUpdate(
      id,
      { $set: editTask },
      { new: true }
    );
    if (!editedTask) return res.status(404).json({ error: "Task not found" });
    res
      .status(200)
      .json({ message: "Task updated successfully", data: editedTask });
  } catch (error) {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};
