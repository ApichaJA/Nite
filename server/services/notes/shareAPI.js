const app = require('express')()
const authenticateUser = require('../../lib/auth/verifyToken')

const { getNotes, getNote, myNote, createNote } = require('./shareController')

app.route('/AllNotes')
    .get(getNotes) // get all Note

app.route('/Note')
    .get(getNote) // get One Note by nid

app.route('/myNote')
    .get(myNote) // get Note by uuid
    .post(createNote) // create note
    // .put() // edit note filter by nid
    // .delete() //remove note
module.exports = app
