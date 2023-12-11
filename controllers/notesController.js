const { v4 } = require("uuid");
const { getNotes, createNote, getOneNote } = require("../model/notes");

function get(req, res) {
  // the model will give us our resource (ie notes)
  const notes = getNotes();
  res.json(notes);
}

function getOne(req, res) {
  // the model will give us our resource
  const note = getOneNote(req.params.id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).send("no note with that id found");
  }
}

function post(req, res) {
  const { content, author } = req.body;

  const newNote = {
    // using the 'uuid' package to generate an id
    id: v4(),
    content,
    author,
  };

  // how a 'new note' is added is the responsibility of the 'model'.
  createNote(newNote);
  res.send("create new note");
}

// do you understand how this is working?
function validator(req, res, next) {
  console.log("hi from inline middleware");
  const { content, author } = req.body;
  if (!content || !author) {
    res.status(400).send("need an author and content");
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
