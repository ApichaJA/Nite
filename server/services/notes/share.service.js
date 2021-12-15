const Note = require("../../models/note");
const { v4: uuidv4 } = require("uuid");

const getAllNote = () => {
  return new Promise((resolve, reject) => {
    Note.find().limit(5).sort( { updatedAt: -1 } )
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

const new_note = (body) => {
  return new Promise(async (resolve, reject) => {
    const { title, detail, uuid, fileUrl, firstname, lastname } = body;
    const create_note = new Note({
      nid: uuidv4(),
      title,
      detail,
      filePdf: fileUrl,
      author: {
        uuid,
        firstname,
        lastname,
      },
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
