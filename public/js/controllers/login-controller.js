angular.module('impulseApp').controller('LoginController',function($scope,$http,$routeParams,$route,$window){

  $scope.user = {};
  $scope.message = "";

  $scope.login = function() {
    var promise = $http.post('/autentica',$scope.user);
    promise.then(function(){
      console.log("passou aqui");
      $window.location.href = "/#!/home";
    }).catch(function(error){
        $scope.message = "Usuario ou senha invalida";
        console.log(error);
      });
  }

});
