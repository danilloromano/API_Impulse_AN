
module.exports = function(app){

  app.get('/',function(req,res){
    console.log('Recebida requisicao na porta 3000.');
    res.send('index.html');
  });

  app.get('/usersData', function(req, res){
    console.log('Recebido os users do get');
    var connection = app.DAO.connection();
    var userDao = new app.DAO.userDao(connection);
    var user = [];
    userDao.list(user,function(error,result){
      if (error) {
        console.log(error);
        res.status(500).send(error);
        return;
      }
      res.status(200).send(JSON.stringify(result));
    });
    connection.end();
  });

  app.get('/user_role',function(req,res){
    var connection = app.DAO.connection();
    var userDao = new app.DAO.userDao(connection);
    var roles = [];
    userDao.categoryUser(roles,function(error,result){
      if (error) {
        console.log(error);
        res.status(500).send(error);
        return;
      }
      res.status(200).send(JSON.stringify(result));
    });
  });


  app.post('/users/newUser',function(req,res){
    var error = req.validationErrors();

    if (error) {
      console.log("erros encontrados");
      res.status(400).send(error);
      return;
    }

    var novoUser = req.body;
    console.log(novoUser);
    var connection = app.DAO.connection();
    var userDao =  new app.DAO.userDao(connection);

    userDao.saveUser(novoUser,function(error,result){
      if (error) {
        console.log(error);
        res.status(500).send(error)
      }
      console.log('user criado');
      res.status(201).json(result);
    });
    connection.end();
  });

  app.post('/users/newUser/address',function(req,res){
    var error = req.validationErrors();

    if (error) {
      console.log("erros encontrados");
      res.status(400).send(error);
      return;
    }
    var newUserAddress = req.body;
    console.log(newUserAddress);
    var connection = app.DAO.connection();
    var userDao = new app.DAO.userDao(connection);

    userDao.saveUserAddress(newUserAddress,function(error,result){
      if (error) {
        console.log(error);
        res.status(500).send(error)
      }
      console.log('user criado');
      res.status(201).json(result);
    });
    connection.end();
  });
}
