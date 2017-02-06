// requires das coisas necessarias
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

// não entendi para o que serve mas facilita pegar um POST e transformar em json
app.use(bodyParser.urlencoded({extended:true}));

// faz nosso node entender json data
app.use(bodyParser.json());

// diz que a pasta public pode ser vista e usar pela pasta views
app.use(express.static('public'));

// diz para usar a view engine do ejs
app.set('view engine', 'ejs');

// conecta no banco
MongoClient.connect('mongodb://killevil:killevil@ds043917.mlab.com:43917/dbalexis', (err, database) => {
  if(err) {
    return console.log(err);
  }
  db = database;
  //fica escutando o localhost:3000
  app.listen(3000, () => console.log('Servidor Iniciado a MILLL'));
});

app.get('/', (req, res) => {
  db.collection('despesas').find().toArray((err, results) => {
    if (err) {
      return console.log(err);
    }
    res.render('index.ejs', {despesas: results});

  })

});;

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
      nome: req.body.alvo
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
  db.collection('despesas').remove({nome : req.body.alvo});

  res.redirect('/');
});
