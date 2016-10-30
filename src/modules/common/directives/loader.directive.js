;!(function(module){

    loaderDiretive.$inject = ['Loader'];

    var controllerDirective = function($scope,$timeout){

        var availableColor = {
            red : "rgba(238, 35, 63, .85)",
            green : "rgba(150, 203, 93, .85)",
            blue : "rgba(59, 90, 127, .85)"
        };

        $scope.show = false;

        $scope.showLoader = function(){
            $scope.show = true;
            $timeout(function(){
                $scope.fullOpacity = true;
            },100);
        };

        $scope.hiddenLoader = function(){
            $scope.fullOpacity = false;
            $timeout(function(){
                $scope.show = false;
            },250);
        };

        if($scope.color && _.has(availableColor,$scope.color)){
            $scope.rgbaColor  = availableColor[$scope.color];
        }else{
            $scope.rgbaColor = availableColor['red'];
        }

    };

    function loaderDiretive(Loader){
        var animation = '<div class="sk-folding-cube custom-gt-animation-loader"> <div class="sk-cube1 sk-cube"></div> <div class="sk-cube2 sk-cube"></div> <div class="sk-cube4 sk-cube"></div> <div class="sk-cube3 sk-cube"></div> </div>';

        return {
            scope : {
                show : "@",
                color : "@",
                text : '='
            },
            template : '<div ng-if="show" ng-style="{ \'background-color\' : rgbaColor }" ng-class="{ \'full-opactity\' : fullOpacity  }" class="custom-gt-loader"><div class="center-vertical"><h3 ng-bind="text"></h3>'+ animation +'</div></div>',
            controller : [ '$scope', '$timeout' , controllerDirective ],
            link : function (scope,element,attrs) {
                Loader.show = scope.showLoader;
                Loader.hidden = scope.hiddenLoader;

                Loader.setScope(scope);
            }
        };
    }

    module.directive('loader',loaderDiretive);

})(angular.module('pizdely.mobile.common'));
