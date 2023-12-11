const { v4 } = require("uuid");
const fs = require("node:fs");
const VIDEOS_PATH = "./data/videos.json";
const { getAllVideos } = require("../model/videos");

function get(req, res) {
  const videos = getAllVideos();
  const key = v4();
  Object.defineProperty(videos, key, {
    value: [],
    enumerable: true,
  });
  console.log(JSON.stringify(videos));
  fs.writeFileSync(VIDEOS_PATH, JSON.stringify(videos));
  res.json({ api_key: key });
}

module.exports = {
  get,
};
