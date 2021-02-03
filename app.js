const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

// Local dependencies
const middlewares = require("./utils/middlewares");

// Get env variables
require("dotenv").config();

try {
  mongoose.connect(
    process.env.MONGO_URI || "mongodb://localhost:27017/lucky-draw",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  );
  console.log("Connected to MongoDB server...");
} catch (error) {
  console.log("Error in connection to mongodb : ", error.message);
}

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(middlewares.requestLogger);

require("./routes")(app);

app.use(middlewares.unknownEndpoint);

module.exports = app;
