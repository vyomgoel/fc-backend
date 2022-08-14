const mongoose = require("mongoose");
const { Schema } = mongoose;
const ContactSchema = new Schema({
  name: {
    type: String,
    required: true, //mongoose ensure this build is required. Required ofrces it.
  },
  email: {
    type: String,
    required: true, //mongoose ensure this build is required. Required ofrces it.
    unique: true,
  },
  date: {
    type: Date,
    required: true, //mongoose ensure this build is required. Required ofrces it.
    default: Date.now(),
  },
});
const User = mongoose.model("contacts", ContactSchema);

module.exports = User;
