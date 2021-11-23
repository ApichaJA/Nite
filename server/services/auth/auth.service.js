const Account = require("../../models/account");
const generateUserToken = require("../../lib/auth/generateToken");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const getAllAccount = () => {
  return new Promise((resolve, reject) => {
    Account.find()
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(new Error(err));
      });
  });
};

const getProfile = (uuid) => {
  return new Promise((resolve, reject) => {
    Account.findOne({ "account.uuid": uuid }, {
      "account.password": 0
    })
      .then(async ({ account, profile }) => {
        resolve(Object.assign({ account }, { profile }));
      })
      .catch(() => {
        reject("uuid dose not exist!");
      });
  });
};

const login = (username, password) => {
  return new Promise((resolve, reject) => {
    Account.findOne({ "account.username": username.toLowerCase() })
      .then(async ({ account, profile, role }) => {
        const match = await bcrypt.compare(password, account.password);
        if (match) {
          const token = generateUserToken(account, profile, role);
          resolve(Object.assign({ uuid: account.uuid }, { profile }, { role }, { accessToken: token }));
        } else {
          reject("Password is not correct!");
        }
      })
      .catch((e) => {
        reject("Username dose not exist!");
      });
  });
};

const create_account = (body) => {
  return new Promise((resolve, reject) => {
    const { username, password, firstname, lastname, role } = body;
    Account.findOne({
      "account.username": username.toLowerCase(),
    })
      .then((isExist) => {
        if (isExist) {
          reject("Username already exists!");
        } else {
          if (!isExist) {
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const create_account = new Account({
              account: {
                username: username.toLowerCase(),
                password: bcrypt.hashSync(password, salt),
                uuid: uuidv4(),
              },
              profile: {
                firstname,
                lastname,
              },
              role: role ? role : "user",
            });

            create_account
              .save()
              .then(() => {
                resolve(login(username, password))
              })
              .catch((err) => {
                reject(new Error(err));
              })
          } else {
            reject("Username already exists!");
          }
        }
      })
      .catch((e) => {
        resolve(new Error(e));
      });
  });
};

const renew_password = ({ username, password, new_password }) => {
  return new Promise((resolve, reject) => {
    Account.findOne({ "account.username": username.toLowerCase() })
      .then(async ({ account }) => {
        const match = await bcrypt.compare(password, account.password);
        if (match) {
          const saltRounds = 10;
          const salt = bcrypt.genSaltSync(saltRounds);
          Account.updateOne(
            { uuid: account.uuid },
            {
              $set: { "account.password": bcrypt.hashSync(new_password, salt) },
            }
          )
            .then(() => {
              resolve(200);
            })
            .catch((e) => {
              reject(e);
            });
        } else {
          reject("Password is not correct!");
        }
      })
      .catch(() => {
        reject("Username dose not exist!");
      });
  });
};

module.exports = {
  getAllAccount,
  login,
  create_account,
  renew_password,
  getProfile,
};
