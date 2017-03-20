angular.module('myDirectives',[])
.directive('impulseHeader', function() {
        var ddo = {};
        ddo.restrict = "AE";
        ddo.templateUrl = 'js/directives/impulseHeader.html';
        return ddo;
})
.directive('impulseFooter', function() {
        var ddo = {};
        ddo.restrict = "AE";
        ddo.templateUrl = 'js/directives/impulseFooter.html';
        return ddo;
})
