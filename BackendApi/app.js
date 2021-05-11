const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { NotFound } = require("./utils/errors");
const winston = require("./utils/winston");
const logger = require("./utils/winstonSequelize");
const sequelize = require("./helpers/database");
const morgan = require("morgan");
const i18nConf = require("./utils/i18n");
const i18n = require("i18n");
const constants = require("./utils/constants");
const handleErrors = require("./middleware/handleErrors");
const userRoute = require("./routes/user");
const adminRoute = require("./routes/hotel");
require("custom-env").env(process.env.NODE_ENV); //custom env file

//setting up i18n
i18nConf();

app.use(bodyParser.json()); // .json() is used to parse json data

//setting up winston logger using morgan to log error and messages to different files.
app.use(morgan("combined", { stream: winston.stream }));

//initializing the i18n
app.use(i18n.init);

//setting up CORS protection
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//User and Admin Routes
app.use("/user", userRoute);
app.use("/admin", adminRoute);

//middleware to handle unregistered URL's
app.use((req, res, next) => {
  throw new NotFound(constants.error.pageError);
});

// common error handling middleware
app.use(handleErrors);

//Database is Synced and we listen to the PORT
sequelize.sync();
app.listen(process.env.PORT);
