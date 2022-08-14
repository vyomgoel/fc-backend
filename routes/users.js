const express = require("express");
const router = express.Router();
const User = require("../models/User");
var fetchuser = require("../middleware/fetchuser");

//ROUTE 1:  GET ALL THE USERS USING GET "/api/user/getuser"
try {
  router.get("/fetchallusers", fetchuser, async (req, res) => {
    const user = await User.find();
    res.json(user);
  });
} catch (error) {
  console.log(error.message);
}

module.exports = router;
