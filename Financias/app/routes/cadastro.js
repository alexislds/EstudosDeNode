const MongoClient = require('mongodb').MongoClient;
const ObjectId    = require('mongodb').ObjectId;

module.exports = (app, db) => {

  app.get('/cadastro', (req, res) => {
    let sessionUserName = req.session.userName;

    res.render('cadastro', {sessionName: sessionUserName});
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
