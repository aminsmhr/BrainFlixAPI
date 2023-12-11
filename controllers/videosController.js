const { v4 } = require("uuid");
const { getVideos, createVideo, getOneVideo } = require("../model/videos");
const {
  getVideoComments,
  createComment,
  deleteComment,
} = require("../model/comments");

function get(req, res) {
  const videos = getVideos(req.query.api_key);
  console.log(req.query.api_key);
  res.json(videos);
}

function getOne(req, res) {
  const video = getOneVideo(req.params.id, req.query.api_key);
  if (video) {
    res.json(video);
  } else {
    res.status(404).send("no video with that id found");
  }
}

function post(req, res) {
  const { title, channel, image, description, duration, video, timestamp } =
    req.body;

  const newVideo = {
    id: v4(),
    title,
    channel,
    image,
    description,
    duration,
    video,
    timestamp,
  };

  createVideo(newVideo, req.query.api_key);
  res.send("create new video");
}

// function getComments(req, res) {
//   getVideoComments()
//   res.send("create new comment");
// }

function addComment(req, res) {
  try {
    const comments = getVideoComments(req.body.id, req.params.api_key);
    createComment(
      req.body.id,
      {
        ...req.body.comment,
        id: comments > -1 ? comments.length++ : 0,
        timestamp: new Date().getTime(),
      },
      req.params.api_key
    );
    res.send("create new comment");
  } catch {
    res.status(500).send("Server failed to store your comment");
  }
}

function removeComment(req, res) {
  deleteComment();
  res.send("create new comment");
}

function validator(req, res, next) {
  if (req.params.api_key === null) {
    console.log("this if is being processed in the middle ware");
    res.status(400).send("need an API key");
  }
  next();
}

module.exports = {
  validator,
  post,
  get,
  getOne,
  addComment,
  removeComment,
};
