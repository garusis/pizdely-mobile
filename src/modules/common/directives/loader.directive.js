;!(function(module){

    loaderDiretive.$inject = ['Loader']

    function loaderDiretive(Loader){
        return {
            scope : {
                show : "="
            },
            template : '<div ng-if="show" class="custom-gt-loader"></div>',
            link : function (scope,element,attrs) {
                Loader.setScope(scope);
            }
        }
    }

    module.directive('loader',loaderDiretive);

})(angular.module('pizdely.mobile.common'));
