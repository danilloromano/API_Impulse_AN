module.exports = function(app) {

  app.post('/autentica', function(req, res) {

    let error = req.validationErrors();

    if (error) {
      console.log("erros encontrados na validacao de usuario");
      res.status(404).send(error);
      return;
    }

    let params = [req.body.email,req.body.password];
    let connection = app.DAO.connection();
    let loginDao =  new app.DAO.loginDao(connection);

    loginDao.searchUser(params,function(error,result) {
      console.log(result);

      if (error) {
        console.log(error);
        res.status(500).send(error);
      }

      let vazio = [];

      if (result.length === 0) {
        let algumaCoisa = {email:"a",password:"a"};
        result.push(algumaCoisa);
        res.status(401).send(error);
        console.log("erro encontrado no login");
      }

      if(params[0] === result[0].email && params[1] === result[0].password ) {
          console.log("usuario logado");
          res.redirect("/#!/home");
      } else  {
          console.log("Erro ao logar, usuario ou senha invalida");
          res.status(500).send(error);
          connection.end();
        };
    });
  });
}
