const fs = require("node:fs");
require("dotenv").config();
const { DATA_FILE } = process.env;
const VIDEOS_PATH = DATA_FILE;

// the 'model' is where we interact with the resource (ie the 'videos' themselves),
// to send to the controller (which then sends the info off to the client/view)

function getVideos(api_key) {
  const file = fs.readFileSync(VIDEOS_PATH);
  const videos = JSON.parse(file);
  return videos[api_key];
}

function getAllVideos() {
  const file = fs.readFileSync(VIDEOS_PATH);
  const videos = JSON.parse(file);
  return videos;
}

function getOneVideo(id, api_key) {
  // notice we are using 'getVideos' here
  const videos = getVideos(api_key);
  const video = videos[api_key].find((video) => video.id === id);
  return video;
}

function createVideo(video, api_key) {
  // notice we are using 'getVideos' here too
  const videos = getAllVideos();
  videos[api_key].push(video);
  fs.writeFileSync(VIDEOS_PATH, JSON.stringify(videos));
}

module.exports = {
  getVideos,
  getAllVideos,
  createVideo,
  getOneVideo,
};
