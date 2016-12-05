;!(function (module) {

    locationIndexController.$inject = ['$scope','$rootScope', '$timeout','LocationService','$state','Loader'];
    function locationIndexController($scope,$rootScope, $timeout,LocationService,$state,Loader) {

        var ctrl = this;

        ctrl.animations = {};
        
        ctrl.objAddress = {
            address :  ""
        };

        ctrl.gps = function(){
            $rootScope.loaderText = 'Te estamos Ubicando';
            Loader.show();
            LocationService.getCurrentPosition()
                .then(function(position){
                    ctrl.objAddress = position.getData();
                    cleaStreet();
                    Loader.hidden();
                    console.log("locationIndex.ctrl.js:18 =",ctrl.objAddress);
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
            $state.go("home.products.list");
        };

        var cleaStreet = function(){
            var wordsOmit = ['Norte de Santander', 'Colombia',/( )+\,( )+/g, /\,$/];
            _.forEach(wordsOmit,function(word){
                ctrl.objAddress.address = ctrl.objAddress.address.replace(word,"");
            });

            ctrl.textAddress = ctrl.objAddress.address;
        };


        $timeout(function(){
            ctrl.animations.showBackground =  true;
        },100);
    }

    module.controller('LocationIndexController', locationIndexController);

})(angular.module('pizdely.mobile.location'));