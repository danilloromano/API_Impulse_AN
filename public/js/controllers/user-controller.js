angular.module('impulseApp').controller('UserController',function($scope,$http,$routeParams){

  $scope.users = [];
  $scope.novoUser = {};
  $scope.newUserAddress = {};
	$scope.filtro = '';
  $scope.showUpdateUserModal = false;
  $scope.showNewUserModal = false;
  $scope.isOpen = false;
  $scope.novoUser.active = {
    value : true
  };

  function pegaCheck(){
    objeto = $scope.novoUser.active.value;
    valorX = objeto.value;
    console.log("funcionei");
    console.log(valorX);
    return objeto;
  };

  var promise = $http.get('/usersData');
  promise.then(function(result){
    $scope.users = result.data;
  }).catch(function(error){
    console.log(error);
  });

  $scope.updateUser = function(user){
    $scope.showUpdateUserModal = true;
    $scope.isOpen = true;
    $scope.userInEdition = user;
  };

    $scope.closeModal = function($event,element) {
    $scope.showUpdateUserModal = false;
    };

  $scope.newUser = function(){
    $scope.isOpen = true;
    $scope.showNewUserModal = true;
  };

  $scope.close = function(){
    $scope.novoUser = "";
    $scope.isOpen = false;
    setTimeout(function() {
      $scope.showNewUserModal = false;
    }, 500)
  };

  $scope.save = function(novoUser){
    console.log($scope.novoUser);
    $scope.userInSave = {
      first_name: novoUser.first_name,
      last_name: novoUser.last_name,
      email: novoUser.email,
      password: novoUser.password,
      active: pegaCheck(),
    };

    console.log($scope.userInSave);
    var promise = $http.post('/users/newUser', $scope.userInSave);
    promise.then(function(){
      $scope.users.push($scope.userInSave);
    }).catch(function(error){
      console.log(error);
    });
  };

  $scope.changeUser = function(novoUser){
    console.log(novoUser);
    $scope.userInChange = {
      first_name: novoUser.first_name,
      last_name: novoUser.last_name,
      email: novoUser.email,
      password: novoUser.password,
      active: novoUser.active,
    };

    var promise = $http.put('/users/user/change',$scope.userInChange,$scope.userInChange.id);
    promise.then(function(){
      $scope.userInChange = {};
      console.log($scope.userInChange);
    }).catch(function(error){
      console.log(error);
    });
  };

  $scope.deleteUser = function(user){
    var id = user.id;
    console.log(id);
    var userIndex = $scope.users.indexOf(user);
    console.log(userIndex);
    $scope.users.splice(userIndex, 1);
    var promise = $http.delete('/users/deleteUser/'+id);
      promise.then(function(){
      }).catch(function(error){
            console.log(error);
        });
  };

});
