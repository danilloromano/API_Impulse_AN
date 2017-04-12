angular.module('impulseApp').controller('ProductController',function($scope,$http,$routeParams,$route){

  $scope.products = [];
  $scope.categorys = [];
	$scope.filtro = '';
  $scope.showUpdateProductModal = false;
  $scope.showNewProoductModal = false;
  $scope.productInSave = {};
  $scope.productInEdition = {};
  $scope.productInchange = {};
  $scope.novoProduto = {};

  var promise = $http.get('/productData');
    promise.then(function(result){
      $scope.products = result.data;
      $scope.products.forEach(function(product){
        var validade  = convertDate(product.validade);
        product.validade = validade;
      });


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

function convertDate(data) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(data);
  return [pad(d.getFullYear()), pad(d.getMonth()+1),d.getDate()].join('-');
}

function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}

function mysqlDateFormat(data) {
    return data.getUTCFullYear() + "-" +
     twoDigits(1 + data.getUTCMonth()) + "-" +
     twoDigits(data.getUTCDate()) + " " +
     twoDigits(data.getUTCHours()) + ":" +
     twoDigits(data.getUTCMinutes()) + ":" +
     twoDigits(data.getUTCSeconds());
};

  function dataInput(data) {
    let formateData = new Date(data);
    return formateData;
    console.log(formateData);
  }


  $scope.saveProduct = function(novoProduto){
    $scope.productInSave = {
      nome: novoProduto.nome,
      marca: novoProduto.marca,
      custo: novoProduto.custo,
      venda: novoProduto.venda,
      validade: convertDate(dataInput(novoProduto.validade)),
      categoria_id: novoProduto.categoria_id,
      descricao: novoProduto.descricao,
      quantidade: novoProduto.quantidade,
      lucro: (novoProduto.venda - novoProduto.custo) * novoProduto.quantidade,
      data:mysqlDateFormat(new Date())
    };

      var promise = $http.post('/products/newProduct', $scope.productInSave);
      promise.then(function(){
        console.log($scope.productInSave);
      $scope.products.push($scope.productInSave);
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


    function DataOriginFormat(novaData){
       let newDate  = new Date(novaData);
       return newDate.toString().split('-');
       console.log(newDate);
    }


    $scope.updateProduct = function(){

      var id = $scope.productInEdition.id;
      console.log("o id do prodto e " + id);

      $scope.productInChange={
        nome: $scope.productInEdition.nome,
        marca: $scope.productInEdition.marca,
        custo: $scope.productInEdition.custo,
        venda: $scope.productInEdition.venda,
        validade: $scope.productInEdition.validade,
        categoria_id: $scope.productInEdition.categoria_id,
        descricao: $scope.productInEdition.descricao,
        quantidade: $scope.productInEdition.quantidade,
        lucro: ($scope.productInEdition.venda - $scope.productInEdition.custo) * $scope.productInEdition.quantidade,
      }

      console.log($scope.productInChange);

      var promise = $http.put('/products/updateProduct/'+id, $scope.productInChange);
        promise.then(function(){
          console.log($scope.productInChange);
        }).catch(function(error){
            console.log(error);
            });
    }

});
