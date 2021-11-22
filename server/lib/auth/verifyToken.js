const jwt = require('jsonwebtoken')

function authenticateUser(req, res, next) {
  const KEY = process.env.KEY
  const token = req.headers.authorization

  if (!token) { return res.sendStatus(401) }

  const accessToken = token.split(' ')[1]

  jwt.verify(accessToken, KEY, (err, user) => {
    if (err) { return res.sendStatus(403) }
    req.uuid = user.uuid
    req.user_id = user.user_id
    next()
  })
}

module.exports = authenticateUser
