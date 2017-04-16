angular.module('impulseApp').controller('LoginController',function($scope,$http,$routeParams,$route){

  $scope.user = {};
  $scope.message = "";

$scope.login = function(){
  var promise = $http.post('/login', $scope.user);
    promise.then(function(){
      console.log($scope.user);
      $scope.message = "Usuario " + $scope.user.nome + " Logado com Sucesso";
  }).catch(function(error){
        $scope.message = "Usuario ou senha invalida";
        console.log(error);
      });
    }
});
