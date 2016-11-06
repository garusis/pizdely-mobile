/**
 * Created by garusis on 16/10/16.
 */
;!(function (module) {

    selectAreaPizzaController.$inject = ['$scope', '$timeout'];
    function selectAreaPizzaController($scope, $timeout) {

        $scope.animations = [];

        //animar los botones despues de que caen
        var includeClassAnimation = function(){
            _.forEach([.4,.8, 1.2,1.6],function(item,key){
                var timeByTimeout = (item * 600) - 200;
                $timeout(function(){
                    $scope.animations[key] = { includeAnimation : true }
                },timeByTimeout);
            });
        };

        $scope.clearSelect = function(){
            $scope.ngIngredient =  null;
            $scope.animations = [];
        };

        $scope.showBtns = function () {
            $scope.showButtons = true;
            includeClassAnimation();
        };
    }

    module.controller('selectAreaPizzaController', selectAreaPizzaController);

})(angular.module('pizdely.mobile.common'));