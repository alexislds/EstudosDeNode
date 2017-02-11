module.exports = (app, db) => {
  app.get('/', (req, res) => {
    db.collection('despesas').find().toArray((err, results) => {
      res.render('index', {despesas: results});
    });
  });
}
