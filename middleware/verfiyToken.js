const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("auth-token") || req.cookies.authToken;
  if (!token) return res.status(400).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.SERVER_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    console.log(token, " this is an invalid token");
    res.status(400).send("Invalid Token");
  }
}

module.exports = auth;
