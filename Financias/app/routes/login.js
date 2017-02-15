const MongoClient = require('mongodb').MongoClient;
const ObjectId    = require('mongodb').ObjectId;

module.exports = (app, db) => {

  app.get('/login', (req, res) => {
    let sessionUserId = req.session.userId;

    console.log(sessionUserId);

    res.render('login', {sessionId: sessionUserId});
  });

  app.post('/login/logar', (req, res) => {

    let usuario = req.body.usuario;
    let senha   = req.body.senha;

    db.collection("usuarios").find({$and : [{"usuario" : usuario}, {"senha" : senha}]}).toArray((err, results) => {
      if (err) {
        console.log(err);
      }


      if (results.length > 0) {
          let id = results[0]._id;
          req.session.userId = id;
      }

      res.redirect('/login');
    });
  });
}
