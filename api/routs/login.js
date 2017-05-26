module.exports = function(app) {

  app.post('/login',function(req,res){
    let error = req.validationErrors();

    if (error) {
      console.log("erros encontrados na validacao de usuario");
      res.status(400).send(error);
      return;
    }

    let params = [req.body.email,req.body.password];
    let connection = app.DAO.connection();
    let loginDao =  new app.DAO.loginDao(connection);

    loginDao.searchUser(params,function(error,result) {
      console.log(params);
      console.log(result);

      let vazio = [];
      if (result === vazio) {
        let algumaCoisa = {
          email:"",
          password:""
        };
        result.push(algumaCoisa);
        console.log(result);
      }

      if (error) {
        console.log(error);
        res.status(500).send(error);
      }


      if(params[0] === result[0].email && params[1] === result[0].password ) {
        console.log("isso ai porra");
        res.status(200).json(result);
        connection.end();
      } else  {
          console.log("Erro ao logar, usuario ou senha invalida");
          return;
          connection.end();
        }
      // res.status(200).json(result);
    });
    // connection.end();
  });



}
