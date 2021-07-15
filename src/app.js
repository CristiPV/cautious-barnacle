const express = require("express");

// Global Variables
const PORT = process.env.PORT || 3001;

const app = express();

// Endpoints
app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/home", (req, res) => {
    res.redirect("/");
});

const server = app.listen(PORT, (error) => {
  if (error) console.log(error);

  console.log("Server is running on port:", server.address().port);
});
