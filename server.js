const app = require('express')();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.urlencoded({extended:true}));

MongoClient.connect('mongodb://killevil:killevil@ds043917.mlab.com:43917/dbalexis', (err, database) => {
  if(err) {
    return console.log(err);
  }

  db = database;
  app.listen(3000, () => console.log('Servidor Iniciado a MILLL'));

});



app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) {
      return console.log(err);
    }

    console.log('saved to database');
    res.redirect('/');
  });
});
