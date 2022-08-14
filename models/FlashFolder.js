const mongoose = require("mongoose");
const { Schema } = mongoose;
const FolderSchema = new Schema({
  folderName: {
    type: String,
    //mongoose ensure this build is required. Required ofrces it.
  },
  numFlashCards: {
    type: String,
    //mongoose ensure this build is required. Required ofrces it.
  },
});
const Folder = mongoose.model("FolderSchema", FolderSchema);

module.exports = Folder;
