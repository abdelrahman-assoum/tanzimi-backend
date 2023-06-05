import mongoose from "mongoose";
import Goal from "../models/goalModel.js";
import User from "../models/userModel.js";
import Task from "../models/taskModel.js";

export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({});
    if (goals.length === 0) {
      return res.status(404).json({ error: "No goals found" });
    }
    res.status(200).json(goals);
  } catch (error) {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getGoalById = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
      return res.status(404).json({ error: "Goal not found" });
    }
    res.status(200).json(goal);
  } catch (error) {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getUserGoals = async (req, res) => {
try {
    let user = req.params.id;
    const userGoals = await Goal.find({ user: user });

    if (userGoals.length > 0) {
      res.status(200).json({
        message: `${userGoals[0].user.firstName} ${userGoals[0].user.lastName} Goals`,
        userGoals,
      });
    } else if (userGoals.length === 0) {
      return res
        .status(200)
        .json({ message: "No Goals Found", userGoals: [] });
    } else {
      return res.status(404).json({ error: "No Goals found" });
    }
} catch (error) {
   if (error) {
     return res.status(500).json({ message: error.message });
   }
}
};

export const createGoal = async (req, res) => {
  try {
    let { name, description, dueDate, tasks, user } = req.body;

    // check if user exists
    const checkUser = await User.findById(user);
    if (!checkUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // check if tasks exists

    const checkTasks = await Task.find({ _id: { $in: tasks } });

    if (checkTasks.length !== req.body.tasks.length) {
      return res.status(404).json({ error: "Tasks not found" });
    }

    const goal = new Goal({
      name,
      description,
      dueDate,
      tasks,
      user,
    });

    const newGoal = await goal.save();
    if (!newGoal) throw new Error();
    res.status(201).json(newGoal);
  } catch (error) {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const updateGoal = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedFields = {};
    if (req.body.name) updatedFields.name = req.body.name;
    if (req.body.description) updatedFields.description = req.body.description;
    if (req.body.dueDate) updatedFields.dueDate = req.body.dueDate;

    // Check if the user exist
    if (req.body.user) {
      const checkUser = await User.findById(req.body.user);
      if (!checkUser) {
        return res.status(404).json({ message: "User not found" });
      } else {
        updatedFields.user = req.body.user;
      }
    }
    // Check if tasks available
    if (req.body.tasks) {
      const checkTasks = await Task.find({
        _id: { $in: req.body.tasks },
      });

      // check if the labels exist
      if (checkTasks.length !== req.body.tasks.length) {
        return res
          .status(404)
          .json({ error: "One of the tasks or all of them not found" });
      } else {
        updatedFields.labels = req.body.tasks;
      }
    }

    const editGoal = { ...req.body, ...updatedFields };

    const editedGoal = await Goal.findByIdAndUpdate(
      id,
      { $set: editGoal },
      { new: true }
    );
    if (!editedGoal) return res.status(404).json({ error: "Goal not found" });
    res
      .status(200)
      .json({ message: "Goal updated successfully", data: editedGoal });
  } catch (error) {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export const deleteGoal = async (req, res) => {
  try {
    await Goal.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Goal deleted" });
  } catch (error) {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};
