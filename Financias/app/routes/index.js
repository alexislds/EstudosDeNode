module.exports = (app, db) => {

  app.get('/', (req, res) => {
    db.collection('despesas').find().toArray((err, results) => {
      res.render('index', {despesas: results});
    });
  });

  app.post('/adicionar', (req, res) => {
    db.collection('despesas').save(req.body, (err, result) => {
      if (err) {
        console.log(err);
      }

      res.redirect('/');
    });
  });

  app.post('/mudar', (req, res) => {
    db.collection('despesas').findOneAndUpdate(
      {
        _id: req.body.alvo
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

  app.post('/deletar', (req, res) => {

    db.collection('despesas').remove({"_id": db.ObjectID(req.body.alvo)});
    // db.collection('despesas').remove({_id : req.body.alvo});

    res.redirect('/');
  });

}
