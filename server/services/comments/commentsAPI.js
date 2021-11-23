const app = require('express')()
const authenticateUser = require('../../lib/auth/verifyToken')

const { post_comment, get_comment } = require('./commentsController')

app.route('/comment')
    .get(get_comment) // get comments
    .post(post_comment) // post comment
module.exports = app
