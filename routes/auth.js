const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "Vyomisagoodb$boy";
//create a user using: post "/api/auth/createuser" no login required.
//Route1userId
router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("password", "Password must be 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //If there are arrors return bad request and the errors.
    //The req. body object allows you to access data in a string or JSON object from the client side.

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check whether user exist
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: user.id,
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      const success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some Error OCCURED");
    }
  }
);

//route 2 : loging in user in our site
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isLength(),
    body("password", "Password cannot").exists(),
  ],
  async (req, res) => {
    let success = false;
    //If there are arrors return bad request and the errors.
    //The req. body object allows you to access data in a string or JSON object from the client side.

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "Try to connect with correct Credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        let success = false;
        return res
          .status(400)
          .json({ success, error: "Try to connect with correct Credentials" });
      }
      const data = {
        id: user.id,
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      let success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internel Server Error Occured");
    }
  }
);
//Router 3 : Get loggedin Details using : Post "api/auth/getuser". Login Required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId);
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internel Server Error Occured");
  }
});
module.exports = router;
