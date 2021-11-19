const router = require("express").Router();
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

router.get("/create", (req, res) => {
  const create_account = new Account({
    // UUID: UUID(),
    account:{
        username: "Japanapi",
        password: "1150"
      },
      profile: {
        firstname: "Apicha",
        lastname: "Junyatanakron"
      },
      role: "admin"
  });

  create_account.save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
