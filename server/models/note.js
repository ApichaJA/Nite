const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    nid: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
    filePdf: {
      type: String,
      required: false,
    },
    author: {
      uuid: {
        type: String,
        require: true,
      },
      firstname: {
        type: String,
        require: true,
      },
      lastname: {
        type: String,
        require: true,
      }
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
