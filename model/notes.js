const fs = require("node:fs");

const NOTES_PATH = "./data/notes.json";

// the 'model' is where we interact with the resource (ie the 'notes' themselves),
// to send to the controller (which then sends the info off to the client/view)

function getNotes() {
  const file = fs.readFileSync(NOTES_PATH);
  const notes = JSON.parse(file);
  return notes;
}

function getOneNote(id) {
  // notice we are using 'getNotes' here
  const notes = getNotes();
  const note = notes.find((note) => note.id === id);
  return note;
}

function createNote(note) {
  // notice we are using 'getNotes' here too
  const notes = getNotes();
  notes.push(note);
  fs.writeFileSync(NOTES_PATH, JSON.stringify(notes));
}

module.exports = {
  getNotes,
  createNote,
  getOneNote,
};
