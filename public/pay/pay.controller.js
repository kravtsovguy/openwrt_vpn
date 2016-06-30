(function () {
    'use strict';

    angular
        .module('app')
        .controller('PayController', PayController);

    PayController.$inject = ['$location', '$routeParams','$window','$rootScope'];
    function PayController($location, $routeParams, $window, $rootScope) {
        
        var vm = this;
        vm.pay = pay;
        function pay(mac){
            alert(mac);
        }
        
    }

})();
