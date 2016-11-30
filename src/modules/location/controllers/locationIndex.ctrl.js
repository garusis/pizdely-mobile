;!(function (module) {

    locationIndexController.$inject = ['$scope', '$timeout','LocationService'];
    function locationIndexController($scope, $timeout,LocationService) {

        var ctrl = this;

        ctrl.animations = {};
        
        ctrl.objAddress = {
            address :  ""
        };

        ctrl.gps = function(){
            LocationService.getCurrentPosition()
                .then(function(position){
                    ctrl.objAddress = position.getData();
                })
                .catch(function(err){
                    alert(err);
                });
        };

        ctrl.sendAddress = function(){
            if(ctrl.textAddress){
                ctrl.objAddress.address = ctrl.textAddress ; // texto ingresado por el usuario
            }
            console.log("locationIndex.ctrl.js:28 =",ctrl.objAddress);
        };


        $timeout(function(){
            ctrl.animations.showBackground =  true;
        },100);
    }

    module.controller('LocationIndexController', locationIndexController);

})(angular.module('pizdely.mobile.location'));