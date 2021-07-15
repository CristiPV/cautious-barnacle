const express = require("express");
const fs = require("fs");

// Global Variables
const PORT = process.env.PORT || 3001;

// Files
const navbar = fs.readFileSync(__dirname + "/public/navbar/navbar.html", "utf-8");
const home = fs.readFileSync(__dirname + "/public/home/home.html", "utf-8");
const footer = fs.readFileSync(__dirname + "/public/footer/footer.html", "utf-8");

const app = express();

app.use(express.static("src/public"));

// Endpoints
app.get("/", (req, res) => {
  res.send(navbar + home + footer);
});

app.get("/home", (req, res) => {
    res.redirect("/");
});

const server = app.listen(PORT, (error) => {
  if (error) console.log(error);

  console.log("Server is running on port:", server.address().port);
});
