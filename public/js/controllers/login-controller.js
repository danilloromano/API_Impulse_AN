angular.module('impulseApp').controller('LoginController',function($scope,$http,$routeParams,$route){

  $scope.user = {};
  $scope.message = "";

  $scope.login = function() {
    var promise = $http.post('/login',$scope.user);
    promise.then(function(){
      $scope.message = " Usuario logado com Sucesso";
    }).catch(function(error){
        $scope.message = "Usuario ou senha invalida";
        console.log(error);
      });
  }
});
