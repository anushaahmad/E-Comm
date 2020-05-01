const config = require("./config");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Require Routes
const student = require("./routes/student.route");

// Set up app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Configure Routes
app.use("/students", student);

mongoose
  .connect(config.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log("Database Connection Established!"))
  .catch(err => console.log(err));
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.listen(config.serverPort, () =>
  console.log(`server is running at ${config.serverPort}`)
);
