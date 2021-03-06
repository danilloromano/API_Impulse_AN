module.exports = function(app){

  app.get('/productData', function(req, res){
    var connection = app.DAO.connection();
    var productDao = new app.DAO.productDao(connection);
    var product = [];
    productDao.list(product,function(error,result){
      if (error) {
        res.status(500).send(error);
        return;
      }
      res.status(200).send(JSON.stringify(result));
    });
    connection.end();
  });

  app.get('/products/productReport/:data', function(req, res) {
    const connection = app.DAO.connection();
    const productDao = new app.DAO.productDao(connection);
    let data  = req.params.data.toString();
    let report = [];
    productDao.listByData(data,report,function(error,result) {
      if (error) {
        res.status(500).send(error);
        return;
      }
      res.status(200).send(JSON.stringify(result));
    });
    connection.end();
  });



  app.get('/productData/category', function(req, res){
    var connection = app.DAO.connection();
    var productDao = new app.DAO.productDao(connection);
    var category = [];
    productDao.listCategory(category,function(error,result){
      if (error) {
        res.status(500).send(error);
        return;
      }
      res.status(200).send(JSON.stringify(result));
    });
    connection.end();
  });

  app.post('/products/newProduct',function(req,res){
    var error = req.validationErrors();

    if (error) {
      res.status(400).send(error);
      return;
    }

    var novoProduto = req.body;
    var connection = app.DAO.connection();
    var productDao =  new app.DAO.productDao(connection);

    productDao.saveProduct(novoProduto,function(error,result){
      if (error) {
        return res.status(404).send(error);
      }
      return res.status(201);//.json(result);
    });
    connection.end();
  });

  app.delete('/products/deleteProduct/:id',function(req,res){

    var error = req.validationErrors();

    if (error) {
      res.status(400).send(error);
      return;
    }

    var id = req.params.id;
    var connection = app.DAO.connection();
    var productDao =  new app.DAO.productDao(connection);

    productDao.deleteProduct(id,function(error,result){
      if (error) {
        res.status(500).send(error)
      }
      res.status(203);
    });
    connection.end();
  });

  app.put('/products/updateProduct/:id',function(req,res){
    let id = req.params.id;
    let Produto = req.body;
    var connection = app.DAO.connection();
    var productDao =  new app.DAO.productDao(connection);
      productDao.updateProduct(Produto,id,function(error,result){
        if (error) {
          res.status(500).send(error)
        }
        res.status(203);
      });
      connection.end();
    });

}
