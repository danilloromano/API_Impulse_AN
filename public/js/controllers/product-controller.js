angular.module('impulseApp').controller('ProductController',function($scope,$http,$routeParams,$route){

  $scope.products = [];
  $scope.categorys = [];
	$scope.filtro = '';
  $scope.showNewProoductModal = false;
  $scope.productInSave = {};
  $scope.novoProduto = {};

  var promise = $http.get('/productData');
    promise.then(function(result){
      $scope.products = result.data;
      console.log($scope.products);
      }).catch(function(error){
        console.log(error);
      });

  var promise = $http.get('/productData/category');
  promise.then(function(result){
    $scope.categorys = result.data;
  }).catch(function(error){
    console.log(error);
  });

  $scope.openNewProduct = function(){
    $scope.isOpen = true;
    $scope.showNewProoductModal = true;
  }

  $scope.closeNewProduct = function(){
    $scope.isOpen = false;
    $scope.novoProduto = "";
    setTimeout( function() {
      $scope.showNewProoductModal = false;
    }, 500)
  }

function convertDate(date) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(date);
  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
}

  $scope.saveProduct = function(novoProduto){
    $scope.productInSave = {
      nome: novoProduto.nome,
      marca: novoProduto.marca,
      custo: novoProduto.custo,
      venda: novoProduto.venda,
      validade: convertDate(novoProduto.validade),
      categoria_id: novoProduto.categoria_id,
      descricao: novoProduto.descricao,
      quantidade: novoProduto.quantidade,
      lucro: (novoProduto.venda - novoProduto.custo) * novoProduto.quantidade,
      data:convertDate(novoProduto.data)
    };
      console.log($scope.productInSave);
      var promise = $http.post('/products/newProduct', $scope.productInSave);
      promise.then(function(){
      // $scope.novoProduto = "";
      console.log($scope.productInSave);
      }).catch(function(error){
        console.log(error);
      });
  }

    $scope.deleteProduct = function(product){
      console.log(product);
      console.log($scope.products);
      var id = product.id;
      var promise = $http.delete('/products/deleteProduct/'+id);
      promise.then(function(){
        // $scope.products.splice(product.indexOf(),1);
      }).catch(function(error){
        console.log(error);
      });
      $route.reload();
    }



});
