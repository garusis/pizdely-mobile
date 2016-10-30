;!(function(module){

    function loaderService(){

        var scope = {};

        this.setScope = function($scope){
            scope = $scope;
        };

        this.show = this.hidden = _.noop;
        return this;
    }

    module.factory('Loader',loaderService);
})(angular.module('pizdely.mobile.common'));

