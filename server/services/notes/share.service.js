const Note = require("../../models/note");
const { v4: uuidv4 } = require("uuid");

const getAllNote = () => {
  return new Promise((resolve, reject) => {
    Note.find()
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(new Error(err));
      });
  });
};

const getOneNote = (nid) => {
  return new Promise((resolve, reject) => {
    Note.findOne({ nid })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(new Error(err));
      });
  });
};

const getMyNote = ({ uuid }) => {
  return new Promise((resolve, reject) => {
    Note.find({ "author.uuid": uuid })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(new Error(err));
      });
  });
};

const new_note = (body, file) => {
  return new Promise((resolve, reject) => {
    const { title, detail, uuid, firstname, lastname, url } = body;
    console.log(file)
    const create_note = new Note({
      nid: uuidv4(),
      title,
      detail,
      author: {
        uuid,
        firstname,
        lastname,
      },
      url: url ? url: ''
    });
    create_note
      .save()
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(new Error(err));
      });
  });
};

const updateNote = (body) => {
  return new Promise((resolve, reject) => {
    const { title, detail, nid } = body;
    edit_note = Note.updateOne(
      { nid },
      {
        $set: {
          title,
          detail,
        },
      }
    )
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(new Error(err));
      });
  });
};

module.exports = {
  getAllNote,
  getOneNote,
  getMyNote,
  new_note,
  updateNote,
};
