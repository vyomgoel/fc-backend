const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Note = require("../models/Note");
var fetchuser = require("../middleware/fetchuser");
//ROUTE 1:  GET ALL THE NOTES USING GET "/api/notes/getuser"
try {
  router.get("/fetchallnotes", fetchuser, async (req, res) => {
    const notes = await Note.find({ user: req.id });
    res.json(notes);
  });
} catch (error) {
  console.log(error.message);
  // res.status(500).send("Internel Server Error Occured");
}

//ROUTE 2: ADD A NEW NOTE USING POST "/api/notes/getuser" LOGIN REQUIRED
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid name").isLength({ min: 3 }),
    body("description", "Description must be 5 characters").isLength({
      min: 3,
    }),
    body("tag", "Enter a valid tag").isLength({
      min: 3,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.id,
      });
      const savedNote = await note.save();
      console.log("saved note", savedNote);
      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internel Server Error Occured");
    }
  }
);
//ROUTE 3: UPDATE AN EXISTING NOTE POST "/api/notes/updatenote" LOGIN REQUIRED
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    // Create a newNote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    console.log("note user", note.user.toString());
    if (note.user.toString() !== req.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internel Server Error Occured");
  }
});
//ROUTE 4: DELETING AN EXISTING NOTE USING DEL "/api/notes/deletenote" LOGIN REQUIRED
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  // const { title, description, tag } = req.body;
  try {
    //FIND THE NOTE TO BE DELETED AND DELETE IT
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    //ALLOW DELETION ONLY IF THE USER OWNS THIS NOTE
    if (note.user.toString() !== req.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ SUCCESS: "NOTE HAS BEEN DELETED" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internel Server Error Occured");
  }
});
module.exports = router;
