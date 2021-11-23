const router = require("express").Router();

const { new_comment, getAllComment, getMyComment } = require('./comments.service')

const get_comment = async (req, res) => {
  const { nid, uuid } = req.query
  try {
    const data = (nid && uuid) ? await getMyComment(uuid, nid) : await getAllComment(nid)
    res.send(data)
  } catch (e) {
    res.status(500).send(e)
  }
}

const post_comment = async (req, res) => {
  try {
    const data = await new_comment(req.body)
    res.send(data)
  } catch (e) {
    res.status(500).send(e)
  }
}

module.exports = {
  post_comment,
  get_comment
};
