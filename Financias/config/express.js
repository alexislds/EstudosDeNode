const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');

module.exports = () => {
  app.use(express.static('./app/public'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());

  app.set('view engine', 'ejs');
  app.set('views', './app/views');

  return app;
}
