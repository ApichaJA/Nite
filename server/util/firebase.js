const { initializeApp, cert } = require('firebase-admin/app');
const { getStorage } = require('firebase-admin/storage');

const serviceAccount = require('./path/to/serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'gs://nite-5b18b.appspot.com'
});

const bucket = getStorage().bucket();

module.exports = bucket