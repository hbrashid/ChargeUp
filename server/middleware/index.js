const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const header = req.headers["authorization"] || "";
  const [bearer, token] = header.split(" ");

  try {
    const decoded = jwt.verify(token, "secret");
    req.user = decoded;
    next();
  } catch (err) {
    res.sendStatus(401);
  }
};

module.exports = {
  authenticate,
};
