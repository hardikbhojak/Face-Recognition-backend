const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const app = express();
const cors = require("cors");
const knex = require("knex");
const signin = require("./controllers/signin");
const register = require("./controllers/register");
const image = require("./controllers/image");
const profile = require("./controllers/profile");
const db = knex({
  client: "pg",
  connection: {
    host: "postgresql-elliptical-08766",
    port: "5432",
    user: "postgres",
    password: "1234",
    database: "facerecog",
  },
});

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("working");
});

app.post("/signin", (req, res) => {
  signin.handleSignIn(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfile(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImagePut(req, res, db);
});

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});
