;!(function(module){

    locationService.$inject = ['$rootScope'];

    function locationService($rootScope){
        
        return this;
    }



    module.factory('LocationService',locationService);
})(angular.module('pizdely.mobile.location'));


