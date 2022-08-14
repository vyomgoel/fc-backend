const express = require("express");
const router = express.Router();
//const Contact = require("../models/Contacts");
const User = require("../models/User");
var fetchuser = require("../middleware/fetchuser");

const { body, validationResult } = require("express-validator");

//ROUTE 1:  GET ALL THE USERS USING GET "/api/user/getuser"
try {
  router.get("/fetchallcontacts", fetchuser, async (req, res) => {
    const contacts = await User.find();
    res.json(contacts);
  });
} catch (error) {
  console.log(error.message);
}
//ROUTER 2 ADD A CONTACT
// router.post(
//   "/addcontacts",
//   fetchuser,
//   [body("username", "Enter a valid username").isLength({ min: 2 })],
//   [body("useremail", "Enter a valid email").isLength({ min: 2 })],
//   async (req, res) => {
//     try {
//       const { name, email } = req.body;
//       const errors = validationResult(req);
//       if (!errors) {
//         return res.status(400).json({ errors: errors.array() });
//       }
//       const userChat = new Contact({
//         name,
//         email,
//       });
//       const savedContact = await userChat.save();
//       console.log("saved contact", savedContact);
//       res.json(savedContact);
//     } catch (error) {
//       console.log(error.message);
//       res.status(500).send("Internel Server Error Occured");
//     }
//   }
// );

module.exports = router;
