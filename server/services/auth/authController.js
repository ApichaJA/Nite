const router = require("express").Router();
const bcrypt = require("bcrypt");

const Account = require("../../models/account");

const { getAllAccount, login } = require('./auth.service')

router.get("/profile", (req, res) => {
  const { id } = req.query

  res.send("Name: Yalo Age: 21 Sex: 2-3 per week");
});


router.post("/create_account", (req, res) => {
  const { username, password, firstname, lastname, role } = req.body;
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const create_account = new Account({
    account: {
      username: username,
      password: bcrypt.hashSync(password, salt),
    },
    profile: {
      firstname: firstname,
      lastname: lastname,
    },
    role: role,
  });

  create_account
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

const getAccounts = async (req, res) => {
  try {
    const data = await getAllAccount()

    res.send(data)
  } catch (e) {
    res.status(500).send(e)
  }
}

const accountLogin = async (req, res) => {
  if (!req.body) {
    res.status(500).send(new Error('FUCKKKKKKKKKKKK'))
  }

  const { username, password } = req.body

  try {
    const loginStatus = await login(username, password)

    res.send(loginStatus)
  } catch (e) {
    res.status(500).send(e)
  }
};

const accountLogout = async () => {
  return true
}

module.exports = {
  getAccounts,
  accountLogin,
  accountLogout
};
