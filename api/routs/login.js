module.exports = function(app){

  app.post('/login',function(req,res){
    var error = req.validationErrors();

    if (error) {
      console.log("erros encontrados na validacao de usuario");
      res.status(400).send(error);
      return;
    }

    var user = req.body;
    var connection = app.DAO.connection();
    var loginDao =  new app.DAO.loginDao(connection);

    loginDao.searchUser(user,function(error,result){
      if (error) {
        console.log(error);
        res.status(500).send(error)
      }
      console.log('Usuario Logado');
      
      res.status(200).json(result);
    });
    connection.end();
  });


}
