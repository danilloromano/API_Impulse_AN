module.exports = function(app){

  app.post('/login',function(req,res){
    var error = req.validationErrors();

    if (error) {
      console.log("erros encontrados na validacao de usuario");
      res.status(400).send(error);
      return;
    }

    let email = req.body.email;
    let password = req.body.password;
    console.log(email,password);
    var connection = app.DAO.connection();
    var loginDao =  new app.DAO.loginDao(connection);

    console.log('passou aqui');

    loginDao.searchUser(email,password,function(error,result){
      console.log('result');

      if (error) {
        console.log(error);
        res.status(500).send(error)
      }
      //
      // if(email === result.email && passorwd === result.passorwd ){
      //   console.log(email,senha);
      //   console.log(result);
      // }

      console.log('result');

      res.status(200).json(result);
    });
    connection.end();
  });


  // app.get('/logout',function(req,res){
  // req.session.destroy(function(error) {
  //   if(error) {
  //     console.log(error);
  //     }
  //   });
  //   //  else {
  //   //   res.redirect('/');
  //   // }
  // });

}
