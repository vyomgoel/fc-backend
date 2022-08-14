const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Folders = require("../models/FlashFolder");
var fetchuser = require("../middleware/fetchuser");
const Folder = require("../models/FlashFolder");
//ROUTE 1: ADD A NEW CHAT USING POST "/api/userchat/addchat" LOGIN REQUIRED
router.post(
  "/addfolder",
  fetchuser,
  [body("folder name", "").isLength({ min: 1 })],
  async (req, res) => {
    try {
      const { folderName } = req.body;
      const errors = validationResult(req);
      if (!errors) {
        return res.status(400).json({ errors: errors.array() });
      }
      const folder = new Folders({
        folderName,
      });
      const saveFolder = await folder.save();
      console.log("saved Folder", saveFolder);
      res.json(saveFolder);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internel Server Error Occured");
    }
  }
);

//ROUTE 2:  GET ALL THE USERS USING GET "/api/user/getuser"
try {
  router.get("/fetchallfolder", fetchuser, async (req, res) => {
    const folder = await Folder.find();
    res.json(folder);
  });
} catch (error) {
  console.log(error.message);
}

// ROUTER 3 UPDATIN FOLDER NAME
router.put("/updatefolder/:id", fetchuser, async (req, res) => {
  const { folderName } = req.body;
  try {
    // Create a newNote object
    const newFolder = {};
    if (folderName) {
      newFolder.name = folderName;
    }

    // let folder = await Folders.findById(req.params.id);

    // if (folder.user.toString() !== req.id) {
    //   return res.status(401).send("Not Allowed");
    // }
    // const foldername = await Folder.findByIdAndUpdate(
    //   req.params.id,
    //   { $set: folder },
    //   { new: true }
    // );
    res.json({ newFolder });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internel Server Error Occured");
  }
});

module.exports = router;
