const MongoClient = require('mongodb').MongoClient;
const ObjectId    = require('mongodb').ObjectId;

module.exports = (app, db) => {
    let sessionUserName;
    let sessionUserId;

  app.get('/despesas', (req, res) => {
    sessionUserName = req.session.userName;
    sessionUserId   = req.session.userId;

    if (sessionUserId) {
      db.collection('usuarios').find({_id : new ObjectId(sessionUserId)}).toArray((err, results) => {
          var resultados = results[0].despesas;

          res.render('despesas', {usuarioDados: resultados, sessionName: sessionUserName});
      });
    }

    else {
      res.redirect('/login');
    }
  });

  app.post('/despesas/adicionar', (req, res) => {
    db.collection("usuarios").findOneAndUpdate({_id : new ObjectId(sessionUserId)},{$push : {despesas : {_id : new ObjectId(), nome : req.body.nome, valor : req.body.valor, categoria : req.body.categoria}}});
    res.redirect('/despesas');
  });

  app.post('/despesas/mudar', (req, res) => {
    db.collection('usuarios').findOneAndUpdate({"despesas._id" : new ObjectId(req.body.alvo)},{$set : {"despesas.$" : {"_id" : new ObjectId(req.body.alvo), nome : req.body.nome, valor : req.body.valor, categoria : req.body.categoria}}});
    res.redirect('/despesas');
  });

  app.post('/despesas/deletar', (req, res) => {
    db.collection("usuarios").findOneAndUpdate({"despesas._id" : new ObjectId(req.body.alvo)},{$pull : {despesas : {_id : new ObjectId(req.body.alvo)}}});
    res.redirect('/despesas');
  });
}
