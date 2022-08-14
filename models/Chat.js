const mongoose = require("mongoose");
const { Schema } = mongoose;
const ChatSchema = new Schema({
  fromusername: {
    type: String,
    // required: true,
    //mongoose ensure this build is required. Required ofrces it.
  },
  fromuserid: {
    type: String,
    // required: true,
    //mongoose ensure this build is required. Required ofrces it.
  },
  message: {
    type: String,
    required: true,
  },
  tousername: {
    type: String,
    // required: true,
    //mongoose ensure this build is required. Required ofrces it.
  },
  touserid: {
    type: String,
    // required: true,
    //mongoose ensure this build is required. Required ofrces it.
  },

  lastmsg: {
    type: String,
    //mongoose ensure this build is required. Required ofrces it.
  },

  lastmsgtime: {
    type: Date,
    //mongoose ensure this build is required. Required ofrces it.
    default: Date.now(),
  },
});
const Chat = mongoose.model("chat", ChatSchema);

module.exports = Chat;
