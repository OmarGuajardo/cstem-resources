const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();

global.appRoot = path.resolve(__dirname);

//Importing DOTENV
dotenv.config();

//Connecting to Database
mongoose
  .connect(process.env.MONGO_DB_URI, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("Error when connecting to DB");
  });

//Middleware

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Router Middleware
app.use("/api", require("./routes/index"));

app.listen(process.env.PORT || 5000, () =>
  console.log("Server is running on port 5000")
);
