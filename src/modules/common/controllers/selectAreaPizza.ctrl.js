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
                    $scope.animations[key] = { includeAnimation : true };
                    if(key == 3){
                        $scope.showCloseBtns();
                    }
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

        $scope.showCloseBtns = function(){
            async(function(){
                $scope.showCloseBtn = true;
                async(function(){
                    $scope.animateCloseBtn = true;
                },200);
            },250);
        };

        var async = function(func,timeout){
            timeout = timeout || 0;
            $timeout(function(){
                func();
            },timeout);
        };
    };

    module.controller('selectAreaPizzaController', selectAreaPizzaController);

})(angular.module('pizdely.mobile.common'));