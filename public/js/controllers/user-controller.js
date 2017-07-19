angular.module('impulseApp').controller('UserController',function($scope,$http,$routeParams){

  $scope.users = [];
  $scope.novoUser = {};
  $scope.userInEdition = {};
	$scope.filtro = '';
  $scope.showUpdateUserModal = false;
  $scope.showNewUserModal = false;
  $scope.isOpen = false;
  $scope.novoUser.active = {
    value : true
  };
  $scope.userInEdition.active = {
    value : true
  };


$scope.change = function(){
  if ($scope.userInEdition.active.value === 1) {
      $scope.userInEdition.active.value = 0;
  }
  $scope.userInEdition.active.value = 1;
};


  function pegaCheck(){
    objeto = $scope.novoUser.active.value;
    valorX = objeto.value;
    return objeto;
  };

  var promise = $http.get('/usersData');
  promise.then(function(result){
    $scope.users = result.data;
  }).catch(function(error){
    console.log(error);
  });

  $scope.openUpdateUserModal = function(user){
    $scope.Open = true;
    $scope.showUpdateUserModal = true;
    $scope.userInEdition = user;
  };

  $scope.closeUpdateUserModal = function(){
    $scope.Open = false;
    setTimeout( function() {
      $scope.showUpdateUserModal = false;
    }, 500)
  };

  $scope.openNewUser = function(){
    $scope.isOpen = true;
    $scope.showNewUserModal = true;
  };

  $scope.closeNewUser = function(){
    $scope.isOpen = false;
    setTimeout( function() {
      $scope.showNewUserModal = false;
    }, 500)
  };

  $scope.save = function(novoUser){
    $scope.userInSave = {
      first_name: novoUser.first_name,
      last_name: novoUser.last_name,
      email: novoUser.email,
      password: novoUser.password,
      active: pegaCheck(),
    };

    var promise = $http.post('/users/newUser', $scope.userInSave);
    promise.then(function(){
      $scope.users.push($scope.userInSave);
      $scope.novoUser = {};
    }).catch(function(error){
      console.log(error);
    });
  };

  $scope.changeUser = function(userInEdition) {
    let id = $scope.userInEdition.id;

    $scope.userInChange = {
      first_name: userInEdition.first_name,
      last_name: userInEdition.last_name,
      email: userInEdition.email,
      password: userInEdition.password,
    };
    var promise = $http.put('/user/change/' + id ,$scope.userInChange);
    promise.then(function(){
      $scope.userInChange = {};
    }).catch(function(error){
      console.log(error);
    });
  };

  $scope.deleteUser = function(user){
    var id = user.id;
    var userIndex = $scope.users.indexOf(user);
    $scope.users.splice(userIndex, 1);
    var promise = $http.delete('/users/deleteUser/'+id);
      promise.then(function(){
      }).catch(function(error){
            console.log(error);
        });
  };

});
