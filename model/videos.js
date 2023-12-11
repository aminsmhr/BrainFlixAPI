const fs = require("node:fs");
require("dotenv").config();
const { DATA_FILE } = process.env;
const VIDEOS_PATH = DATA_FILE;

const templateVideo = {
  title: undefined,
  channel: undefined,
  image: undefined,
  description: undefined,
  views: undefined,
  likes: undefined,
  duration: undefined,
  video: undefined,
  timestamp: undefined,
  comments: [],
};
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
  const videos = getVideos(api_key);
  const video = videos.find((video) => video.id == id);
  return video;
}

function createVideo(video, api_key) {
  // notice we are using 'getVideos' here too
  const videos = getAllVideos();
  const newId = videos[api_key].length + 1;
  const mergedObject = {
    ...templateVideo,
    ...video,
    id: newId,
  };
  videos[api_key].push(mergedObject);
  console.log(mergedObject);
  fs.writeFileSync(VIDEOS_PATH, JSON.stringify(videos));
}

module.exports = {
  getVideos,
  getAllVideos,
  createVideo,
  getOneVideo,
};
