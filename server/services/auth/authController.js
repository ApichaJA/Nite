const router = require("express").Router();
const bcrypt = require("bcrypt");

const Account = require("../../models/account");

router.get("/profile", (req, res) => {
  res.send("Name: Yalo Age: 21 Sex: 2-3 per week");
});

router.get("/allAccount", (req, res) => {
  Account.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
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

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.sendStatus(401);
  } else {
    Account.findOne({ "account.username": username })
      .then(async ({ account }) => {
        const match = await bcrypt.compare(password, account.password);
        if (match) {
          res.sendStatus(200);
        } else {
          res.sendStatus(401);
        }
      })
      .catch(() => {
        res.sendStatus(401);
      });
  }
});

router.delete("/logout", (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
