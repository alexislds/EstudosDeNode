const MongoClient = require('mongodb').MongoClient;
const ObjectId    = require('mongodb').ObjectId;

module.exports = (app, db) => {

  app.get('/despesas', (req, res) => {
    let sessionUserId = req.session.userId;

    db.collection('despesas').find().toArray((err, results) => {

      res.render('despesas', {despesas: results, sessionId: sessionUserId});
    });
  });

  app.post('/despesas/adicionar', (req, res) => {
    db.collection('despesas').save(req.body, (err, result) => {
      if (err) {
        console.log(err);
      }

      res.redirect('/despesas');
    });
  });

  app.post('/despesas/mudar', (req, res) => {
    db.collection('despesas').findOneAndUpdate(
      {
        _id: ObjectId(req.body.alvo)
      },
      {
        $set: {
        nome: req.body.nome,
        valor: req.body.valor,
        categoria: req.body.categoria
        }
      },
      {
        sort: {_id:1},
        upsert: true
      }
    );

    res.redirect('/');
  });

  app.post('/despesas/deletar', (req, res) => {

    db.collection('despesas').remove({_id: ObjectId(req.body.alvo)});

    res.redirect('/despesas');
  });
}
