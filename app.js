const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

// Local dependencies
const middlewares = require("./utils/middlewares");

require("dotenv").config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(middlewares.requestLogger);

app.use(middlewares.unknownEndpoint);

module.exports = app;
