module.exports = function(app){

  app.get('/productData', function(req, res){
    console.log('Recebida requisicao na porta 3000.');
    var connection = app.DAO.connection();
    var productDao = new app.DAO.productDao(connection);
    var product = [];
    productDao.list(product,function(error,result){
      if (error) {
        console.log(error);
        res.status(500).send(error);
        return;
      }
      res.status(200).send(JSON.stringify(result));
    });
  });

}
