;!(function (module) {

    locationIndexController.$inject = ['$scope', '$timeout'];
    function locationIndexController($scope, $timeout) {

        $scope.animations = {};


        $timeout(function(){
            console.log("locationIndex.ctrl.js:10 =");
            $scope.animations.showBackground =  true;
        },50);

        var init = function(){
          alert("yolo");
        };

        init();         
        console.log("locationIndex.ctrl.js:14 =");
    }

    module.controller('LocationIndexController', locationIndexController);

})(angular.module('pizdely.mobile.location'));