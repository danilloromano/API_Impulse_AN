angular.module('impulseApp').controller('ProductController',function($scope,$http,$routeParams,$route){

  $scope.products = [];
  $scope.categorys = [];
	$scope.filtro = '';
  $scope.showUpdateProductModal = false;
  $scope.showNewProoductModal = false;
  $scope.productInSave = {};
  $scope.productInEdition = {};
  $scope.novoProduto = {};

  var promise = $http.get('/productData');
    promise.then(function(result){
      $scope.products = result.data;
      }).catch(function(error){
        console.log(error);
      });

  var promise = $http.get('/productData/category');
  promise.then(function(result){
    $scope.categorys = result.data;
  }).catch(function(error){
    console.log(error);
  });

  $scope.openUpdateProductModal = function(product){
    $scope.Open = true;
    $scope.showUpdateProductModal = true;
    $scope.productInEdition = product;
  }

  $scope.closeUpdateProductModal = function(){
    $scope.Open = false;
    $scope.Produto = "";
    setTimeout( function() {
      $scope.showUpdateProductModal = false;
    }, 500)
  }

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
  return [pad(d.getFullYear()), pad(d.getMonth()+1),d.getDate()].join('-');
}

$scope.revertDate = function (date) {
  var d=new Date(date.split("/").reverse().join("-"));
  var dd=d.getDate();
  var mm=d.getMonth()+1;
  var yy=d.getFullYear();
  var newdate = yy+"/"+mm+"/"+dd;
  return newdate;
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
      var promise = $http.post('/products/newProduct', $scope.productInSave);
      promise.then(function(){
      $scope.products.push($scope.productInSave);
      // $scope.novoProduto = '';
      }).catch(function(error){
        console.log(error);
      });
  }

    $scope.deleteProduct = function(product){
      var id = product.id;
      var productIndex = $scope.products.indexOf(product);
      $scope.products.splice(productIndex, 1);
      var promise = $http.delete('/products/deleteProduct/'+id);
        promise.then(function(){
          }).catch(function(error){
              console.log(error);
              });
    }

    $scope.updateProduct = function(product){
      var id = product.id;
      var promise = $http.put('/products/updateProduct/',id,product);
        promise.then(function(){
          console.log(product);
        }).catch(function(error){
            console.log(error);
            });
    }

});
