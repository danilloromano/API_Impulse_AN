angular.module('impulseApp').controller('LoginController',function($scope,$http,$routeParams,$route){

  $scope.user = {};
  $scope.message = "";
  $scope.userData = [];

  $scope.login = function() {
    var promise = $http.post('/login',$scope.user);
    promise.then(function(){
      $scope.message = " Usuario logado com Sucesso";
    }).catch(function(error){
        $scope.message = "Usuario ou senha invalida";
        console.log(error);
      });
  }

  $scope.getUser = function() {
    var promise = $http.get('/user/data');
    promise.then(function(result){
      $scope.userData = result.data;
      loginDao($scope.userData);
    }).catch(function(error){
        $scope.message = error;
        console.log(error);
      });
  }



});
