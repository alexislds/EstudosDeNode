const MongoClient = require('mongodb').MongoClient;
const ObjectId    = require('mongodb').ObjectId;

module.exports = (app, db) => {

  app.get('/login', (req, res) => {
    let sessionUserName = req.session.userName;

    res.render('login', {sessionName: sessionUserName});
  });

  app.post('/login/logar', (req, res) => {

    let usuario = req.body.usuario;
    let senha   = req.body.senha;

    db.collection("usuarios").find({$and : [{"usuario" : usuario}, {"senha" : senha}]}).toArray((err, results) => {
      if (err) {
        console.log(err);
      }

      if (results.length > 0) {

        req.session.userId = results[0]._id;
        req.session.userName = results[0].nome;

        res.redirect('/despesas');
      }

      else {
        res.redirect('/login');
      }
    });
  });

  app.get('/login/deslogar', (req, res) => {
    req.session.destroy();

    res.redirect('/login');
  });
}
