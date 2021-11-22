const router = require("express").Router();

const { getAllAccount, login, create_account, renew_password, getProfile } = require('./auth.service')

const createAccount = async (req, res) => {
  if (!req.body) {
    res.status(500).send(new Error('Empty Body'))
  }
  try {
    const createStatus = await create_account(req.body)
    res.send(createStatus)
  }
  catch (e) {
    res.status(500).send(e)
  }
};

const getAccounts = async (req, res) => {
  try {
    const data = await getAllAccount()
    res.send(data)
  } catch (e) {
    res.status(500).send(e)
  }
}

const new_password = async (req, res) => {
  try {
    const resStatus = await renew_password(req.body)
    res.sendStatus(resStatus)
  }
  catch (e) {
    res.status(500).send(e)
  }
}

const accountLogin = async (req, res) => {
  if (!req.body) {
    res.status(500).send(new Error('Empty Body'))
  }
  const { username, password } = req.body
  try {
    const loginStatus = await login(username, password)
    res.send(loginStatus)
  } catch (e) {
    res.status(500).send(e)
  }
};

const getProfileById = async (req, res) => {
  try {
    const getStatus = await getProfile(req.uuid)
    res.send(getStatus)
  } catch (e) {
    res.status(500).send(e)
  }
}

const accountLogout = async () => {
  return true
}

module.exports = {
  getAccounts,
  accountLogin,
  accountLogout,
  createAccount,
  new_password,
  getProfileById
};
