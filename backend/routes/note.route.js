import express from "express"
import { authenticateToken } from "../utilities.js"
import {
  addNote,
  deleteNote,
  editNote,
  getAllNotes,
  searchNote,
  updateNotePinned,
} from "../Controller/note.controller.js"

const router = express.Router()

router.post("/add", authenticateToken, addNote)
router.post("/edit/:noteId", authenticateToken, editNote)
router.get("/all", authenticateToken, getAllNotes)
router.delete("/delete/:noteId", authenticateToken, deleteNote)
router.put("/update-note-pinned/:noteId", authenticateToken, updateNotePinned)
router.get("/search", authenticateToken, searchNote)

export default router