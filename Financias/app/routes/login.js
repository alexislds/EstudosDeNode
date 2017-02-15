const MongoClient = require('mongodb').MongoClient;
const ObjectId    = require('mongodb').ObjectId;

module.exports = (app, db) => {

  app.get('/login', (req, res) => {

    console.log('LOGADO ID = ' + req.session.userId);

    res.render('login');
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
