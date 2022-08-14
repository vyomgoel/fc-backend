const mongoose = require("mongoose");

const { Schema } = mongoose;
const NotesSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true, //mongoose ensure this build is required. Required ofrces it.
  },
  description: {
    type: String,
    required: true, //mongoose ensure this build is required. Required ofrces it.
  },
  tag: {
    type: String,
    default: "General",
  },
  date: {
    type: Date,
    default: Date.now, //mongoose ensure this build is required. Required ofrces it.
  },
  folderId: {
    type: String,
    //mongoose ensure this build is required. Required ofrces it.
  },
});

module.exports = mongoose.model("notes", NotesSchema);
