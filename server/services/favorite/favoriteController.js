const router = require("express").Router();

const { new_fav, getFav, deleteFav } = require('./favorite.service')

const myFav = async (req, res) => {
  try {
    const data =  req.query.nid ? await new_fav(req.query) : await getFav(req.query)
    res.send(data)
  } catch (e) {
    res.status(500).send(e)
  }
}

const removeFav = async (req, res) => {
  try {
    const data = await deleteFav(req.query)
    res.send(data)
  } catch (e) {
    res.status(500).send(e)
  }
}

module.exports = {
  myFav,
  removeFav
};
