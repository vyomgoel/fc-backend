const express = require("express");
const router = express.Router();
const Userchat = require("../models/UserChat");
const { body, validationResult } = require("express-validator");

var fetchuser = require("../middleware/fetchuser");

//ROUTE 1: ADD A NEW CHAT USING POST "/api/userchat/addchat" LOGIN REQUIRED
router.post(
  "/userchat",
  fetchuser,
  [body("username", "Enter a valid username").isLength({ min: 2 })],

  async (req, res) => {
    try {
      const { username, lastmsg, lastmsgtime } = req.body;
      const errors = validationResult(req);
      if (!errors) {
        return res.status(400).json({ errors: errors.array() });
      }
      const userChat = new Userchat({
        username,
        lastmsg,
        lastmsgtime,
      });
      const savedChat = await userChat.save();
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
  router.get("/fetchalluserschat", fetchuser, async (req, res) => {
    const userchat = await Userchat.find();
    res.json(userchat);
  });
} catch (error) {
  console.log(error.message);
}

module.exports = router;
