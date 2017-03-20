angular.module('impulseApp').controller('UserController',function($scope,$http,$routeParams){

  $scope.users = [];
  $scope.novoUser = {};
  $scope.roles = [];
  $scope.newUserAddress = {};
	$scope.filtro = '';
  $scope.showUpdateUserModal = false;
  $scope.showNewUserModal = false;
  $scope.isOpen = false;

  var promise = $http.get('/usersData');
  promise.then(function(result){
    $scope.users = result.data;
  }).catch(function(error){
    console.log(error);
  });

  var promise = $http.get('/user_role');
  promise.then(function(result){
      $scope.roles = result.data;
  }).catch(function(error){
    console.log(error);
  });

  $scope.updateRole = function(role){
    $scope.roleInEdition = role;
  }

  $scope.updateUser = function(user){
    $scope.showUpdateUserModal = true;
    $scope.userInEdition = user;
  }

    $scope.closeModal = function($event,element){
    $scope.showUpdateUserModal = false;
  }

    $scope.openModal = function(element){
  }

  $scope.newUser = function(){
    $scope.isOpen = true;
    $scope.showNewUserModal = true;
  }

  $scope.close = function(){
    $scope.novoUser = "";
    $scope.isOpen = false;
    setTimeout( function() {
      $scope.showNewUserModal = false;
    }, 500)

  }

  $scope.save = function(novoUser){
    console.log($scope.novoUser);
    $scope.userInSave = {
      first_name: novoUser.first_name,
      last_name: novoUser.last_name,
      email: novoUser.email,
      cpf: novoUser.cpf,
      rg: novoUser.rg,
      password: novoUser.password,
      phone: novoUser.phone,
      user_role: novoUser.user_role,
      birth:'2017/12/12'
    };
    console.log($scope.userInSave);
    var promise = $http.post('/users/newUser', $scope.userInSave);
    promise.then(function(){
    $scope.userInSave = {};
    console.log($scope.userInSave);
    }).catch(function(error){
      console.log(error);
    });
  }

  $scope.saveUserAddress = function(novoUser){
      $scope.newUserAddress= {
      address_name :novoUser.address_name,
      neighborhood : novoUser.neighborhood,
      number : novoUser.number,
      cep : novoUser.cep,
      addition : novoUser.addition,
      user_rg  : novoUser.rg
    };

    console.log($scope.newUserAddress);
    var promise = $http.post('/users/newUser/address',$scope.newUserAddress);
    promise.then(function(){
      $scope.newUserAddress = {};
      console.log($scope.newUserAddress);
    }).catch(function(error){
      console.log(error);
    });
  }

});
