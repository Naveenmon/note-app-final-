import express from 'express'
import { deleteNote, getAllNotes, singleNote, updateNote, writeNote } from '../controllers/note.controller.js'

const noteRoute = express.Router()

noteRoute.get("/", getAllNotes)
noteRoute.post("/write", writeNote)
noteRoute.put("/edit/:id", updateNote)
noteRoute.get("/:id", singleNote)
noteRoute.delete("/:id", deleteNote)

export default noteRoute;