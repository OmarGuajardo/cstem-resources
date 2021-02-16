const router = require("express").Router();
const {
  userValidation,
  loginValidation,
} = require("../../functions/validation");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  //Making sure request meets our template
  const { error } = await userValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) return res.status(400).send("Email already exists");

  //Hashing passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    const savedUser = await user.save();
    res.status(200).send(savedUser);
  } catch (err) {
    res.status(400).send("User couldn't be saved");
  }
});

router.post("/login", async (req, res) => {
  //Making sure request meets our template
  const { error } = await loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking to see if email is our DB
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email/Password is incorrect");

  //Checking to see if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Email/Password is incorrect");

  //Create and assign token
  const token = jwt.sign({ id: user._id }, process.env.SERVER_SECRET);
  const data = {
    name: user.name,
    email: user.email,
    _id: user._id,
  };
  res.header("auth-token", token).send(data);
});

router.get("/checkToken", (req, res) => {
  const token = req.cookies.authToken || req.header("auth-token");
  if (!token) return res.status(400).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.SERVER_SECRET);
    res.status(200).send(verified);
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
});

module.exports = router;
