const app = require('express')()
const { getAccounts, accountLogin, accountLogout, createAccount, new_password, getProfileById } = require('./authController')

app.route('/account')
  .get(getAccounts) // get all accounts route
  .post() // create account route

app.post('/account/login', accountLogin) // Log in route
app.post('/account/logout', accountLogout) // log out route

app.post('/account/sign-up', createAccount) // log out route

app.post('/account/re-password', new_password) // Change Password

app.route('/account/profile')
  .get(getProfileById) // get user profile (by id) get from req.query eg. /profile?id=6565
  .put() // edit user profile
  .delete() // remove user profile

module.exports = app
