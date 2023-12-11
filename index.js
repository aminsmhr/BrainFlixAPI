// we need this (only once at the top of the 'index' file)
// to be able to read in env variables from .env
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const videoRoutes = require("./routes/videos");
const registerRoutes = require("./routes/register");

const app = express();
const { PORT } = process.env;

// app.use(cors({origin: process.env.CORS_ORIGIN}))
// above will allow cors only from provided origin
app.use(cors());
app.use(express.json());

app.use("/videos", videoRoutes);
app.use("/register", registerRoutes);

// note how 'succint' this file is. it tells us the 'basics':
// enables cores, mounts some route files, and listens for connections on a port.  That's it!
app.listen(PORT, () => {
  console.log("running on", PORT);
});
