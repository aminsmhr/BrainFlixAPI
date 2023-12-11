const fs = require("node:fs");

const VIDEOS_PATH = "./data/videos.json";

// the 'model' is where we interact with the resource (ie the 'videos' themselves),
// to send to the controller (which then sends the info off to the client/view)

function getVideos() {
  const file = fs.readFileSync(VIDEOS_PATH);
  const videos = JSON.parse(file);
  return videos;
}

function getOneVideo(id) {
  // notice we are using 'getVideos' here
  const Videos = getVideos();
  const video = videos.find((video) => video.id === id);
  return video;
}

function createVideo(video) {
  // notice we are using 'getVideos' here too
  const videos = getVideos();
  videos.push(video);
  fs.writeFileSync(VIDEOS_PATH, JSON.stringify(videos));
}

module.exports = {
  getVideos,
  createVideo,
  getOneVideo,
};
