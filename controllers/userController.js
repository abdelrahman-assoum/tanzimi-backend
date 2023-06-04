import mongoose from "mongoose";
import User from "../models/userModel.js";
import fs from "fs";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Get All Users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

// Get User By ID

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
    if (!user) return res.status(404).json({ error: "User not found" });
  } catch (error) {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

// Create Or Register User

export const register = async (req, res, next) => {
  try {
    let { email, password, firstName, lastName, phoneNumber } = req.body;
    // let picture = req.file.path;
    // Fields Validation
    if (!email || !password || !firstName || !lastName || !phoneNumber) {
      // if (req.file.path) {
      //   try {
      //     fs.unlinkSync(req.file.path);
      //   } catch (err) {
      //     console.error("Error deleting file:", err);
      //   }
      // }
      return res.status(400).json({
        error: "All fields are required",
      });
    }
    // Check if user already registered

    const checkUser = await User.findOne({ email: email });

    if (checkUser) {
      // if (req.file.path) {
      //   try {
      //     fs.unlinkSync(req.file.path);
      //   } catch (err) {
      //     console.error("Error deleting file:", err);
      //   }
      // }
      return res.status(400).json({ error: "User already registered" });
    }
    // Hashing the password

    const salt = await bcrypt.genSalt(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    // Create User
    const user = new User({
      email: email,
      password: hashPassword,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      // picture: picture,
    });

    // Save User
    if (user) {
      await user.save();
      // Generate token
      const token = generateToken(user._id);

      res
        .status(201)
        .json({ message: "User successfully registered", user, token });
    } else {
      return res.status(400).json({ message: "Invalid User data" });
    }
  } catch (error) {
    // if (req.file) {
    //   fs.unlinkSync(req.file.path);
    // }
    // console.log("hi");
    res.json({ error: error.message });
  }
};
// Login an User

export const login = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    // Fields Validation

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...otherDetails } = user._doc;
      const token = generateToken(user._id);
      const userData = {...otherDetails}
       res.json({
        user: userData,
        token: token,
      });
      // if user not found
    } else {
      return res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    let id = req.params.id;
    await User.findByIdAndDelete({ _id: id }).then((response) => {
      console.log(response);
      if (!response) {
        res.status(404).json({ message: "User not found" });
      }
      if (response.picture) {
        fs.unlinkSync(response.picture);
      }
      res.status(200).json({ message: "User deleted successfully" });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const generateToken = (id) => {
  return jwt.sign({ _id: id }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedFields = {};
    if (req.body.email) updatedFields.email = req.body.email;
    if (req.body.password) {
      const salt = bcrypt.genSaltSync(10);
      updatedFields.password = bcrypt.hashSync(req.body.password, salt);
    }
    if (req.body.firstName) updatedFields.firstName = req.body.firstName;
    if (req.body.lastName) updatedFields.lastName = req.body.lastName;
    if (req.body.phoneNumber) updatedFields.phoneNumber = req.body.phoneNumber;

    if (req.file) {
      updatedFields.picture = req.file.path;

      // Delete the old picture
      const user = await User.findById(id);
      if (user.picture) {
        fs.unlinkSync(user.picture);
      }
    }
    const editUser = { ...req.body, ...updatedFields };

    const editedUser = await User.findByIdAndUpdate(
      id,
      { $set: editUser },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "User updated successfully", data: editedUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
