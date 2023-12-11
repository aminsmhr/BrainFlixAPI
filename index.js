// we need this (only once at the top of the 'index' file)
// to be able to read in env variables from .env
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const dogFacts = require("./routes/dog-facts");
const noteRoutes = require("./routes/notes");

const app = express();

// we are destructuring the PORT env (see .env file)
const { PORT } = process.env;

// app.use(cors({origin: process.env.CORS_ORIGIN}))
// above will allow cors only from provided origin
app.use(cors());

app.use(express.json());

// local dog facts!
app.use("/api/v2", dogFacts);

// our 'entry point' to the notes routes
app.use("/notes", noteRoutes);

// note how 'succint' this file is. it tells us the 'basics':
// enables cores, mounts some route files, and listens for connections on a port.  That's it!
app.listen(PORT, () => {
  console.log("running on", PORT);
});
