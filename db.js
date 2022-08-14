const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://vyomgoel:vyomgoel12345@cluster0.daqjw.mongodb.net/inotebook";

const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("Conected to mongoose sucessfully");
  });
};

module.exports = connectToMongo;
