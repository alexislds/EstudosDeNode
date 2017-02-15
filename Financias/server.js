const app      = require('./config/express.js')();
const database = require('./app/database/database.js');
const session  = require('express-session');

app.use(session({
  resave : true,
  saveUninitialized : true,
  secret : 'As_arvores_somos_nozes',
  cookie : {
    masAge : 60000
  }
}));

database.connectDb( (err) => {
  const db            = database.getDb();
  const rotaIndex     = require('./app/routes/index.js')(app, db);
  const rotaLogin     = require('./app/routes/login.js')(app, db);
  const rotaCadastro  = require('./app/routes/cadastro.js')(app, db);
  const rotaPerfil    = require('./app/routes/perfil.js')(app, db);
  const rotaDespesas  = require('./app/routes/despesas.js')(app, db);

  app.listen(3000, () => console.log('Server ON...'));
});
