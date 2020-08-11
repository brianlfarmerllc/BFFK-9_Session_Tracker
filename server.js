const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
require('dotenv').config()


const PORT = process.env.PORT || 3001;

// Define middleware here
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || process.env.Atlas_Connect, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },);

// Start the API server
app.listen(PORT, () => {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
