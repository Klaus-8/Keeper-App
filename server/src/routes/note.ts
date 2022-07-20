import { Router } from "express";

import {
  createNote,
  getAllNotes,
  updateNote,
  deleteNote,
} from "../controllers/note.js";
import { authorizeUser } from "../middleware/authorize.js";

const router = Router();

router.post("/create", authorizeUser, createNote);
router.get("/", authorizeUser, getAllNotes);
router.patch("/update/:noteId", authorizeUser, updateNote);
router.delete("/delete/:noteId", authorizeUser, deleteNote);

export default router;
