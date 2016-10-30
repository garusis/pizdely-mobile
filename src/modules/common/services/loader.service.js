;!(function(module){

    function loaderService(){

        var scope = {};

        this.setScope = function($scope){
            scope = $scope;
        };

        this.show = function(){
            console.log("loader.service.js:12 =");
            scope.show = true;
        };

        this.hiden = function(){
            scope.show = false;
        };

        return this;
    }

    module.factory('Loader',loaderService);
})(angular.module('pizdely.mobile.common'));

