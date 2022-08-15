const connectToMongo = require("./db");
const express = require("express");

connectToMongo();
const app = express();
const port = 3000;
var cors = require("cors");

app.use(cors());
app.use(express.json());

// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));
app.use("/api/users", require("./routes/users"));

app.use("/api/folder", require("./routes/folder"));

app.use("/api/userchat", require("./routes/userchat"));
app.use("/api/chat", require("./routes/chat"));
app.use("/api/contact", require("./routes/contact"));

app.listen(port, () => {
  console.log(`FlashChat backend listening at http://localhost:${port}`);
});
