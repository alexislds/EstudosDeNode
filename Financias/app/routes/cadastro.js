const MongoClient = require('mongodb').MongoClient;
const ObjectId    = require('mongodb').ObjectId;

module.exports = (app, db) => {

  app.get('/cadastro', (req, res) => {
    console.log('LOGADO ID = ' + req.session.userId);

    res.render('cadastro');
  });

  app.post('/cadastro/cadastrar', (req, res) => {

    db.collection('usuarios').save(req.body, (err, results) => {
      if (err){
        console.log(err);
      }

      res.redirect('/login');
    })


  });
}
