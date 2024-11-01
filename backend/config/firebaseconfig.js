const admin = require("firebase-admin");

const serviceAccount = require("./blogg-e6a1b-firebase-adminsdk-qikns-3b55e9c4a1.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;




