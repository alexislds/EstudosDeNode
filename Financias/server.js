// requires das coisas necessarias
const app          = require('./config/express.js')();
const database     = require('./app/database/database.js');

database.connectDb( (err) => {
  const db         = database.getDb();
  const rotaIndex  = require('./app/routes/index.js')(app, db);
  const rotaPerfil = require('./app/routes/perfil.js')(app, db);

  app.listen(3000, () => console.log('Server ON...'));
});



// app.get('/', (req, res) => {
//   db.collection('despesas').find().toArray((err, results) => {
//     res.render('index', {despesas: results});
//   });



// app.post('/adicionar', (req, res) => {
//   db.collection('despesas').save(req.body, (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//
//     res.redirect('/');
//   });
// });
//
// app.post('/mudar', (req, res) => {
//   db.collection('despesas').findOneAndUpdate(
//     {
//       nome: req.body.alvo
//     },
//     {
//       $set: {
//       nome: req.body.nome,
//       valor: req.body.valor,
//       categoria: req.body.categoria
//       }
//     },
//     {
//       sort: {_id:1},
//       upsert: true
//     }
//   );
//
//   res.redirect('/');
// });
//
// app.post('/deletar', (req, res) => {
//   db.collection('despesas').remove({nome : req.body.alvo});
//
//   res.redirect('/');
// });
