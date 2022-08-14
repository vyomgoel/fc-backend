const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");
const { body, validationResult } = require("express-validator");

var fetchuser = require("../middleware/fetchuser");

//ROUTE 1: ADD A NEW CHAT USING POST "/api/userchat/addchat" LOGIN REQUIRED
router.post(
  "/chat",
  fetchuser,
  // [body("fromusername", "Enter a valid username").isLength({ min: 2 })],
  // [body("fromuserid", "Enter a valid userid").isLength({ min: 2 })],
  [body("message", "Enter a valid message").isLength({ min: 2 })],
  // [body("tousername", "Enter a valid tousername").isLength({ min: 2 })],
  // [body("touserid", "Enter a valid touserid").isLength({ min: 2 })],
  async (req, res) => {
    try {
      const { message } = req.body;
      const errors = validationResult(req);
      if (!errors) {
        return res.status(400).json({ errors: errors.array() });
      }
      const chat = new Chat({
        // fromusername,
        // fromuserid,
        message,
        // tousername,
        // touserid,
      });
      const savedChat = await chat.save();
      console.log("saved chat", savedChat);
      res.json(savedChat);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internel Server Error Occured");
    }
  }
);
//ROUTE 2:  GET ALL THE USERS USING GET "/api/user/getuser"
try {
  router.get("/fetchallchat", fetchuser, async (req, res) => {
    const chat = await Chat.find();
    res.json(chat);
  });
} catch (error) {
  console.log(error.message);
}

module.exports = router;
