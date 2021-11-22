const router = require("express").Router();

const { getAllNote, getOneNote, getMyNote, new_note } = require('./share.service')

const getNotes = async (req, res) => {
  const { nid } = req.query

  try {
    const data = !nid ? await getAllNote() : await getOneNote(nid)
    res.send(data)
  } catch (e) {
    res.status(500).send(e)
  }
}

const myNote = async (req, res) => {
  try {
    const data = await getMyNote(req.query)
    res.send(data)
  } catch (e) {
    res.status(500).send(e)
  }
}

const createNote = async (req, res) => {
  try {
    const data = await new_note(req.body)
    res.send(data)
  } catch (e) {
    res.status(500).send(e)
  }
}

module.exports = {
  getNotes,
  myNote,
  createNote
};
