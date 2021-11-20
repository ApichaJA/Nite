const Account = require("../../models/account");

const getAllAccount = () => {
  return new Promise((resolve, reject) => {
    Account.find()
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(new Error(err));
      });
  })
}

const login = (username, password) => {
  return new Promise((resolve, reject) => {

    Account.findOne({ "account.username": username })
      .then(async ({ account }) => {
        const match = await bcrypt.compare(password, account.password);
        if (match) {
          resolve(true)
        } else {
          reject(new Error('Password is not correct!'))
        }
      })
      .catch((e) => {
        reject(new Error(e))
      });

  })
}

module.exports = {
  getAllAccount,
  login
}