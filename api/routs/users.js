module.exports = function(app) {

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
      console.log(result);
    });
    connection.end();
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

  app.put('/user/change/:id',function(req,res){
    var error = req.validationErrors();

    if (error) {
      console.log("erros encontrados");
      res.status(400).send(error);
      return;
    }
    let id = req.params.id;
    let user = req.body;

    console.log(user);
    console.log(id);
    var connection = app.DAO.connection();
    var userDao = new app.DAO.userDao(connection);

    userDao.changeUser(user,id,function(error,result){
      if (error) {
        console.log(error);
        res.status(500).send(error)
      }
      console.log('user alterado');
      res.status(202).json(result);
    });
    connection.end();
  });


  app.delete('/users/deleteUser/:id',function(req,res){

    var error = req.validationErrors();

    if (error) {
      console.log("erros encontrados");
      res.status(400).send(error);
      return;
    }

    var id = req.params.id;
    var connection = app.DAO.connection();
    var userDao = new app.DAO.userDao(connection);

    userDao.deleteUser(id,function(error,result){
      if (error) {
        console.log(error);
        res.status(500).send(error)
      }
      console.log('usuario deletado');
      res.status(203);
    });
    connection.end();
  });
};
