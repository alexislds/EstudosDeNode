const MongoClient = require('mongodb').MongoClient;
const ObjectId    = require('mongodb').ObjectId;

module.exports = (app, db) => {

  app.get('/cadastro', (req, res) => {
    let sessionUserId = req.session.userId;

    console.log('LOGADO ID = ' + req.session.userId);

    res.render('cadastro', {sessionId: sessionUserId});
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
