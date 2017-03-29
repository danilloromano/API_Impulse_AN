angular.module('impulseApp').controller('UserController',function($scope,$http,$routeParams){

  $scope.users = [];
  $scope.novoUser = {};
  $scope.roles = [];
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
  }

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
    $scope.isOpen = true;
    $scope.userInEdition = user;
  }

    $scope.closeModal = function($event,element){
    $scope.showUpdateUserModal = false;
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
      active: pegaCheck(),
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

  $scope.changeUser = function(userInEdition){
    $scope.userInChange = {
      first_name: userInEdition.first_name,
      last_name: userInEdition.last_name,
      email: userInEdition.email,
      cpf: userInEdition.cpf,
      rg: userInEdition.rg,
      password: userInEdition.password,
      phone: userInEdition.phone,
      user_role: userInEdition.user_role,
      active: userInEdition.active,
      birth:'2017/12/12'
    };

    var promise = $http.put('/users/user/change',$scope.userInChange,$scope.userInChange.rg);
    promise.then(function(){
      $scope.userInChange = {};
      console.log($scope.userInChange);
    }).catch(function(error){
      console.log(error);
    });
  }

  $scope.changeAddress = function(userInEdition){
    $scope.addressInChange = {
      address_name :userInEdition.address_name,
      neighborhood : userInEdition.neighborhood,
      number : userInEdition.number,
      cep : userInEdition.cep,
      addition : userInEdition.addition,
      user_rg  : userInEdition.rg
    };

    var promise = $http.put('/users/user/change',$scope.addressInChange,$scope.addressInChange.user_rg);
    promise.then(function(){
      $scope.addressInChange = {};
      console.log($scope.addressInChange);
    }).catch(function(error){
      console.log(error);
    });
  }
});
