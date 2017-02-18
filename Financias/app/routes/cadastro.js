const MongoClient = require('mongodb').MongoClient;
const ObjectId    = require('mongodb').ObjectId;

module.exports = (app, db) => {
  let errorUsuario;

  app.post('/cadastro/cadastrar', (req, res) => {

    db.collection('usuarios').find({usuario : {$exists : true, $in : [req.body.usuario]}}).toArray((err, results) => {
      if (err) {
        console.log(err);
      }

      if (results.length == 0) {
        db.collection('usuarios').save(req.body, (err, results) => {
          if (err){
            console.log(err);
          }

          res.redirect('/login');
        });
      }

      else if (results.length > 0) {
        errorUsuario = "Usuario já cadastrado";

        res.redirect('/cadastro');
      }


    });
  });

  app.get('/cadastro', (req, res) => {
    let sessionUserName = req.session.userName;

    res.render('cadastro', {sessionName : sessionUserName, error : errorUsuario});

    errorUsuario = null;
  });
}
