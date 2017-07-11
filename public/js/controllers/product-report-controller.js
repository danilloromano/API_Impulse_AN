angular.module('impulseApp').controller('ProductReportController',function($scope,$http,$routeParams,$route){

$scope.novaData = {};
$scope.reports = [];
$scope.lucroTotal = 0;

function convertDate(data) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(data);
  return [pad(d.getFullYear()), pad(d.getMonth()+1),d.getDate()].join('-');
}

  $scope.searchByData = function(novaData) {
    let data = convertDate($scope.novaData.data);
    var promise = $http.get('/products/productReport/'+data);
    promise.then(function(result) {
      $scope.reports = result.data;
      $scope.lucroTotal = $scope.reports.reduce((acc, next) =>  { return acc + next.lucro }, 0);
      console.log($scope.reports);
  }).catch(function(error) {
    console.log(error);
  });
};


});
