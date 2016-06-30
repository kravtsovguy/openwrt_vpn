(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'home/home.view.html',
                controllerAs: 'vm'
            })
            
            .when('/pay', {
                controller: 'PayController',
                templateUrl: 'pay/pay.view.html',
                controllerAs: 'vm'
            })

            .otherwise({ redirectTo: '/' });
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http','$window'];
    function run($rootScope, $location, $cookieStore, $http, $window) {
        
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            
        });
        
    }

})();