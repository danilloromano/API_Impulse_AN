angular.module("impulseApp",['myDirectives','ngRoute'])
.config(function($routeProvider) {

        $routeProvider.when('/home', {
            templateUrl: 'partials/home.html'
        });

        $routeProvider.when('/users', {
            templateUrl: 'partials/user-list.html',
            controller: 'UserController'
        });

        $routeProvider.when('/products', {
            templateUrl: 'partials/product-list.html',
            controller: 'ProductController'
        });
        
        $routeProvider.otherwise({redirectTo: '/home'});
    });
