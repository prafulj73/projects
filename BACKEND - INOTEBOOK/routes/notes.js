const express = require("express");
const Notes = require("../models/NotesModel");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult, check } = require("express-validator");
const { findById } = require("../models/NotesModel");

const router = express.Router();

// Route 1: fecth all the notes , GET /notes/fetchAllNotes post login i.e. after verifying using JWT token
router.get("/fetchAllNotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    return res.json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error!");
  }
});

// Route 2: add a note to the user data, POST/notes/AddNote post login
router.post(
  "/AddNote",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body(
      "description",
      "description must be atleat 5 characters long"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const notes = new Notes({
        user: req.user.id,
        title,
        description,
        tag
      });
      const savedNote = await notes.save();

      return res.json({ savedNote });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server error!");
    }
  }
);

// Route 3: update a note to the user data, PUT /notes/updateNote post login
router.put("/updateNote/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;
  const userId = req.user.id;
  const newNote = {};

  if (title) newNote.title = title;
  if (description) newNote.description = description;
  if (tag) newNote.tag = tag;

  try {
    //find the note to be updated
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(500).send("Not Found!");
    }
    //if user is trying to access note which is not associated to that respective user
    if (note.user.toString() !== req.user.id)
      return res.status(500).send("Not Allowed!");

    // updating the note with same id after all the authentication, and if note doesnt exit, make one new note with the details.
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    return res.json({ note });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error!");
  }
});

//Route 4: deleting a note ... DELETE notes/deleteNote post login
router.delete("/deleteNote/:id", fetchUser, async (req, res) => {
  try {
    //find the note to be deleted
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(500).send("Not Found!");
    }
    //if user is trying to access note which is not associated to that respective user
    if (note.user.toString() !== req.user.id)
      return res.status(500).send("Not Allowed!");

    //find the record and delete that
    note = await Notes.findByIdAndDelete(req.params.id);
    return res.json({ message: "Note deleted Successfully!!" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error!");
  }
});

module.exports = router;
