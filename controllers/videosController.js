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
    video: "https://project-2-api.herokuapp.com/stream",
    timestamp,
  };
  try {
    console.log(newVideo);
    createVideo(newVideo, req.query.api_key);
    res.json(newVideo);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// function getComments(req, res) {
//   getVideoComments()
//   res.send("create new comment");
// }

function addComment(req, res) {
  try {
    const comments = getVideoComments(req.params.id, req.query.api_key);
    let newId = comments.length > -1 ? comments.length + 1 : 0;
    createComment(
      req.params.id,
      {
        ...req.body,
        id: newId,
        timestamp: new Date().getTime(),
      },
      req.query.api_key
    );
    res.json({
      ...req.body,
      id: newId,
      timestamp: new Date().getTime(),
    });
  } catch (e) {
    res.status(500).send(`Server failed to store your comment: ${e.message}`);
  }
}

function removeComment(req, res) {
  deleteComment(req.params.id, req.params.commentId, req.query.api_key);
  res.send("Comment removed");
}

function validator(req, res, next) {
  if (req.params.api_key === null) {
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
