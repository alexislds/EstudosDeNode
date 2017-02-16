module.exports = (app) => {
  app.get('/perfil', (req, res) => {
    let sessionUserName = req.session.userName;

    res.render('perfil', {sessionName: sessionUserName});
  });
}
