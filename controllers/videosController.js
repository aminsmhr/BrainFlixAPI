const { v4 } = require("uuid");
const { getVideos, createVideo, getOneVideo } = require("../model/videos");

function get(req, res) {
  const videos = getVideos();
  res.json(videos);
}

function getOne(req, res) {
  const video = getOneVideo(req.params.id);
  if (video) {
    res.json(video);
  } else {
    res.status(404).send("no video with that id found");
  }
}

function post(req, res) {
  const { title, url, creator } = req.body;

  const newVideo = {
    id: v4(),
    title,
    url,
    creator,
  };

  createVideo(newVideo);
  res.send("create new video");
}

function validator(req, res, next) {
  console.log("hi from inline middleware");
  const { title, url, creator } = req.body;
  if (!title || !url || !creator) {
    res.status(400).send("need a title, URL, and creator for the video");
  } else {
    next();
  }
}

module.exports = {
  validator,
  post,
  get,
  getOne,
};
