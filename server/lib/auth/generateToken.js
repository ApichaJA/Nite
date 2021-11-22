const jwt = require("jsonwebtoken")

const generateUserToken = (account, profile, role) => {
    return jwt.sign({ uuid: account.uuid, user: account.username, userDetail: profile, role }, process.env.KEY, {
        expiresIn: 86400,
      })
  }

module.exports = generateUserToken