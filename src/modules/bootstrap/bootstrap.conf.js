/**
 * Created by garusis on 15/10/16.
 */
;!(function (module) {

    $config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
    function $config($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            .state('home', {
                url: "/",
                abstract: true,
                templateUrl: "templates/wrapper.html"
            });

        $urlRouterProvider
            .otherwise(function ($injector) {
                var $state = $injector.get('$state');
                return $state.go('home.products.list');
            });
    }

    module.config($config);


})(angular.module('pizdely.mobile', [
    'ionic',
    'ionic-toast',
    'angular.filter',
    'pizdely.mobile.mock',
    'pizdely.mobile.orders',
    'pizdely.mobile.products'
]));