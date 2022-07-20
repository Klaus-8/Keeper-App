import { Request, Response } from "express";

import logger from "../logger/logger.js";
import { Note, User } from "../models/index.js";

export const createNote = async (req: Request, res: Response) => {
  try {
    logger.info("🔨 Creating Note ...");
    const { user } = res.locals;

    const currentUser = await User.findOne({ email: user.email });

    const newNote = new Note({
      user: currentUser?._id,
      ...req.body,
    });

    const savedNote = await newNote.save();

    logger.info("✨ Note created sucessfully.");
    return res.status(201).json(savedNote);
  } catch (error) {
    logger.error(error);
    return res.status(500).json(error);
  }
};

export const getAllNotes = async (req: Request, res: Response) => {
  try {
    logger.info("🔍 Retrieving notes ...");
    const { user } = res.locals;

    const currentUser = await User.findOne({ email: user.email });
    const notes = await Note.find({ user: currentUser?._id });

    logger.info("✨ Notes retrieved sucessfully.");
    return res.status(200).json(notes);
  } catch (error) {
    logger.error(error);
    return res.status(500).json(error);
  }
};

export const updateNote = async (req: Request, res: Response) => {
  try {
    logger.info("🔨 Updating Note ...");

    const { noteId } = req.params;
    const updatedNote = await Note.findOneAndUpdate({ noteId }, req.body, {
      new: true,
    });

    logger.info("✨ Note updated sucessfully.");
    return res.status(201).json(updatedNote);
  } catch (error) {
    logger.error(error);
    return res.status(500).json(error);
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    logger.warn("🚨 Deleting Note ...");

    const { noteId } = req.params;
    const deletedNote = await Note.findOneAndDelete({ noteId });

    if (!deletedNote) {
      logger.error(`🚨 No Note found with id '${noteId}'`);
      return res.status(404).json({ message: `Note not found!` });
    } else {
      logger.info("✨ Note deleted sucessfully.");
      return res.status(204).json({ message: "Note deleted sucessfully" });
    }
  } catch (error) {
    logger.error(error);
    return res.status(500).json(error);
  }
};
