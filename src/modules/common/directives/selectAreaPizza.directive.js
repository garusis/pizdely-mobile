;!(function(module){

    selectDirective.$inject = ['$timeout'];

    function selectDirective($timeout){
        return {
            scope : {
                ngIngredient : '=',
                actionLeft : '&',
                actionRight : '&',
                actionAll : '&'
            },
            templateUrl : 'templates/selectAreaPizza.html',
            controller : 'selectAreaPizzaController',
            link : function (scope,element,attrs) {
                var node  = element[0];
                if(!node){
                    return;
                }

                $timeout(function(){
                    node.classList.add('full-size');
                    $timeout(function(){
                        scope.showBtns();
                    },150);
                },0);
            }
        };
    }

    module.directive('selectAreaPizza',selectDirective);

})(angular.module('pizdely.mobile.common'));
