var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $location, $http) {
    //$scope.myUrl = $location.absUrl();
    
    $scope.findUser = function(){
        $http.get("/api/user/"+$scope.mac)
        .then(function(response) {
            $scope.user = response.data;
            $scope.nuser = angular.copy($scope.user);
        });
    }
    
    $scope.saveUser = function(){
        $http.put("/api/user/"+$scope.mac, $scope.nuser)
        .then(
            function(response){
                //alert(JSON.stringify(response.data));
                location.reload();
            }, 
            function(response){

            }
        );
    }
});