angular.module('impulseApp').controller('ProductController',function($scope,$http,$routeParams){

  $scope.products = [];
	$scope.filtro = '';


  var promise = $http.get('/productData');
  promise.then(function(result){
    $scope.products = result.data;
    console.log($scope.products);
  }).catch(function(error){
    console.log(error);
  });

});
