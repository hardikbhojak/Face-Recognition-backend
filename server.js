require("dotenv").config();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const knex = require("knex");
const signin = require("./controllers/signin");
const register = require("./controllers/register");
const express = require("express");
const image = require("./controllers/image");
const app = express();
const profile = require("./controllers/profile");
const cors = require("cors");

const DBHOST = process.env.DB_HOST;
const DBNAME = process.env.DB_NAME;
const DBUSER = process.env.DB_USER;
const DBPASSWORD = process.env.DB_PASSWORD;
const DBPORT = process.env.DB_PORT;

const db = knex({
  client: "pg",
  connection: {
    // connectionString: "database-01.cjivshkf3r8n.us-west-2.rds.amazonaws.com",
    // ssl: { rejectUnauthorized: false },
    host: DBHOST,
    port: DBPORT,
    user: DBUSER,
    password: DBPASSWORD,
    database: DBNAME,
  },
});

app.use(bodyParser.json());
app.use(cors({ origin: ["*"] }));

app.get("/", (req, res) => {
  console.log("GOT REQUEST");
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
app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running at port ${process.env.PORT || 4000}`);
});
