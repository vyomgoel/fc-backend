const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserChatSchema = new Schema({
  username: {
    type: String,
    required: true,
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
const UserChat = mongoose.model("userchat", UserChatSchema);

module.exports = UserChat;
