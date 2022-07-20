import mongoose, { Schema } from "mongoose";

import { INote } from "../interfaces/index.js";

const NoteSchema: Schema = new Schema(
  {
    user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    noteId: { type: "string", required: true, unique: true },
    title: { type: "string" },
    content: { type: "string" },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model<INote>("Note", NoteSchema);

export default Note;
