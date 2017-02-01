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


// quando fizer a requisicao faz:
app.get('/', (req, res) => {
  // pega as quotes
  db.collection('quotes').find().toArray((err, results) => {
    if (err) {
      return console.log(err);
    }
    // renderiza as quotes
    res.render('index.ejs', {quotes: results});
  });
});

// quando fizer um post (enviar um form)
app.post('/quotes', (req, res) => {
  // salva no db
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) {
      return console.log(err);
    }
    //redireciona para url raiz
    res.redirect('/');
  });
});

// quando fizer um put (atraves de form ou js)
app.put('/quotes', (req, res) => {
  //trabalha com o put request
  db.collection('quotes').findOneAndUpdate(
    {
      name: 'Alex'
    },
    {
      $set: {
      name: req.body.name,
      quote: req.body.quote
      }
    },
    {
      sort: {_id:-1},
      upsert: true
    },
    (err, results) => {
      if (err) {
        return res.send(err);
      }
      res.send(results);
    }
  );
});

app.delete('/quotes', (req, res) => {
  db.collection('quotes').findOneAndDelete(
    {
      name: req.body.name
    },
    (err, results) => {
      if (err) {
        return res.send(500, err);
      }
      res.send('A darth vader quote got deleted');
    }
  );
});
