angular.module('impulseApp').controller('ProductController',function($scope,$http,$routeParams,$route){

  $scope.products = [];
  $scope.categorys = [];
	$scope.filtro = '';
  $scope.showUpdateProductModal = false;
  $scope.showNewProoductModal = false;
  $scope.productInEdition = {};
  $scope.novoProduto = {};
  $scope.lucroTotal = 0.0;



  var promise = $http.get('/productData');
    promise.then(function(result){
      $scope.products = result.data;
      $scope.lucroTotal = $scope.products.reduce((acc, next) =>  { return acc + next.lucro }, 0);

      $scope.products.forEach(function(product){
        let validade  = new Date(convertDate(product.validade));
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

function criaLucroTotal(){
  $scope.products.map(function(item){
    // let quardaLucros = [];
    // quardaLucros.push(item.lucro);
    // console.log(quardaLucros);
    return item.lucro;
  });
};

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

function generateProfit(venda,custo,quantidade) {
    let profit = (venda - custo) * quantidade;
    return profit.toFixed(2);
};

  $scope.openUpdateProductModal = function(product){
    $scope.Open = true;
    $scope.showUpdateProductModal = true;
    $scope.productInEdition = product;
  }

  $scope.closeUpdateProductModal = function(){
    $scope.Open = false;
    setTimeout( function() {
      $scope.showUpdateProductModal = false;
    }, 500)
  }

  $scope.openNewProduct = function(){
    $scope.isOpen = true;
    $scope.showNewProoductModal = true;
    $scope.novoProduto = {};
  }

  $scope.closeNewProduct = function(){
    $scope.isOpen = false;
    setTimeout( function() {
      $scope.showNewProoductModal = false;
    }, 500)
  }

  $scope.saveProduct = function(novoProduto){

    let productInSave = {
      nome: novoProduto.nome,
      marca: novoProduto.marca,
      custo: novoProduto.custo,
      venda: novoProduto.venda,
      validade: convertDate(novoProduto.validade),
      categoria_id: novoProduto.categoria_id,
      descricao: novoProduto.descricao,
      quantidade: novoProduto.quantidade,
      lucro: generateProfit(novoProduto.venda,novoProduto.custo,novoProduto.quantidade),
      data:mysqlDateFormat(new Date())
    };

      var promise = $http.post('/products/newProduct', productInSave);
      promise.then(function(){
        console.log(productInSave);
      $scope.products.push(productInSave);
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

    $scope.updateProduct = function() {

      let id = $scope.productInEdition.id;

      let productInChange={
        nome: $scope.productInEdition.nome,
        marca: $scope.productInEdition.marca,
        custo: $scope.productInEdition.custo,
        venda: $scope.productInEdition.venda,
        validade: convertDate($scope.productInEdition.validade),
        categoria_id: $scope.productInEdition.categoria_id,
        descricao: $scope.productInEdition.descricao,
        quantidade: $scope.productInEdition.quantidade,
        lucro: generateProfit($scope.productInEdition.venda,$scope.productInEdition.custo,$scope.productInEdition.quantidade)
      }

      let promise = $http.put('/products/updateProduct/'+ id, productInChange);
        promise.then(function(){
        }).catch(function(error){
            console.log(error);
            });
    }

});
