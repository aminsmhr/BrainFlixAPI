const fs = require("node:fs");
require("dotenv").config();
const { DATA_FILE } = process.env;
const VIDEOS_PATH = DATA_FILE;

function getVideoComments(id, api_key) {
  console.log("listing comments for :", id, api_key);
  const file = fs.readFileSync(VIDEOS_PATH);
  const videos = JSON.parse(file);
  let video = videos[api_key].find((video) => video.id == id);
  console.log("amin", id, "====> ", video);

  if (!Object.keys(video).includes("comments")) {
    console.log("comments not found");
    video.comments = [];
    console.log(videos[api_key]);
  }
  return video.comments;
}

function getAllVideos() {
  const file = fs.readFileSync(VIDEOS_PATH);
  const videos = JSON.parse(file);
  return videos;
}

function createComment(id, comment, api_key) {
  const videos = getAllVideos();
  videoFound = videos[api_key].find((video) => video.id == id);
  console.log(videoFound);
  if (videoFound) {
    videoFound.comments ??= [];
    console.log("videoFound", videoFound);
    videoFound.comments.push(comment);
    fs.writeFileSync(VIDEOS_PATH, JSON.stringify(videos));
  } else {
    console.error("Video not found");
  }
}

function deleteComment(id, commentId, api_key) {
  const videos = getAllVideos();
  const videoFound = videos[api_key].find((video) => video.id == id);
  if (videoFound) {
    const commentIndex = videoFound.comments.findIndex(
      (comment) => comment.id == commentId
    );
    console.log(commentId, commentIndex);
    if (commentIndex !== -1) {
      videoFound.comments.splice(commentIndex, 1);
      fs.writeFileSync(VIDEOS_PATH, JSON.stringify(videos));
    } else {
      console.error("Comment not found");
    }
  } else {
    console.error("Video not found");
  }
}

module.exports = {
  getVideoComments,
  deleteComment,
  createComment,
};
