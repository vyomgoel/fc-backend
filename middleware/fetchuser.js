var jwt = require("jsonwebtoken");
const JWT_SECRET = "Vyomisagoodb$boy";

const fetchuser = (req, res, next) => {
  //GET THE USER FROM THE JWT TOKEN AND ADD ID TO REQ OBJECT
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    console.log("data", data);
    req.id = data.id;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchuser;
