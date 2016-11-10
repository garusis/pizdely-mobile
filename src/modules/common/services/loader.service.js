;!(function(module){

    function loaderService($rootScope){

        var scope = {};

        this.setScope = function($scope){
            scope = $scope;
        };

        this.setText = function (text) {
            $rootScope.loaderText = text;
        };

        this.show = this.hidden = _.noop;
        return this;
    }

    loaderService.$inject = ['$rootScope'];

    module.factory('Loader',loaderService);
})(angular.module('pizdely.mobile.common'));

