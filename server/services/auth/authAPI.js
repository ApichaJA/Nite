const app = require('express')()
const { getAccounts, accountLogin, accountLogout } = require('./authController')

app.route('/account')
  .get(getAccounts) // get all accounts route
  .post() // create account route

app.post('/account/login', accountLogin) // Log in route
app.post('/account/logout', accountLogout) // log out route

app.route('/profile')
  .get() // get user profile (by id) get from req.query eg. /profile?id=6565
  .put() // edit user profile
  .delete() // remove user profile

module.exports = app
