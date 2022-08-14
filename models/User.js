const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
  name: {
    type: String,
    required: true, //mongoose ensure this build is required. Required ofrces it.
  },
  email: {
    type: String,
    required: true, //mongoose ensure this build is required. Required ofrces it.
    unique: true,
  },
  password: {
    type: String,
    required: true, //mongoose ensure this build is required. Required ofrces it.
  },
  date: {
    type: Date,
    required: true, //mongoose ensure this build is required. Required ofrces it.
    default: Date.now(),
  },
});
const User = mongoose.model("user", UserSchema);

module.exports = User;
