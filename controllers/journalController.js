import mongoose from "mongoose";
import Journal from "../models/journalModel.js";
import fs from 'fs';

export const getJournals = async (req, res) => {
  try {
    const journals = await Journal.find({});
    if (journals.length === 0) {
      return res.status(404).json({ error: "No journals found" });
    }
    res.status(200).json(journals);
  } catch (error) {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export const createJournal = async (req, res) => {
  try {
    let { title, content, user } = req.body;
    if (req.file) {
      let picture = req.file.path;
      const journal = new Journal({
        title,
        content,
        picture,
        user,
      });
      await journal.save();
      res.status(201).json(journal);
    } else {
      const journal = new Journal({
        title,
        content,
        user,
      });
      await journal.save();
      res.status(201).json(journal);
    }
  } catch (error) {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export const updateJournal = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedFields = {};
    if (req.body.title) updatedFields.title = req.body.title;
    if (req.body.content) updatedFields.content = req.body.content;
    if (req.body.user) updatedFields.user = req.body.user;

    if (req.file) {
      updatedFields.picture = req.file.path;

      // Delete the old picture
      const journal = await Journal.findById(id);
      if (journal.picture) {
        fs.unlinkSync(journal.picture);
      }
    }
    const editJournal = { ...req.body, ...updatedFields };
    console.log(editJournal);
    const editedJournal = await Journal.findByIdAndUpdate(
      id,
      { $set: editJournal },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Journal edited successfully", data: editedJournal });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteJournal = async (req, res) => {
  try {
    let id = req.params.id;
    const journal = await Journal.findById(id);
    if(!journal) {
        return res.status(404).json({ error: "Journal not found" });
    }
    if (journal.picture) {
      fs.unlinkSync(journal.picture);
    }
    await Journal.findByIdAndDelete(id);
    res.status(200).json({ message: "Journal deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
