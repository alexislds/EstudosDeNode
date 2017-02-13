// requires das coisas necessarias
const app          = require('./config/express.js')();
const database     = require('./app/database/database.js');

database.connectDb( (err) => {
  const db         = database.getDb();
  const rotaIndex  = require('./app/routes/index.js')(app, db);
  const rotaPerfil = require('./app/routes/perfil.js')(app, db);

  app.listen(3000, () => console.log('Server ON...'));
});
