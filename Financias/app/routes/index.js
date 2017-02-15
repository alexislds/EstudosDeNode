const MongoClient = require('mongodb').MongoClient;
const ObjectId    = require('mongodb').ObjectId;

module.exports = (app, db) => {

  app.get('/', (req, res) => {
    let sessionUserId = req.session.userId;

    if (sessionUserId > 0) {
      res.redirect('/despesas');
    }

    else {
      res.redirect('/login');
    }
  });
}
