/**
 * Created by garusis on 16/10/16.
 */
;!(function (module) {

    $config.$inject = ['$stateProvider'];
    function $config($stateProvider) {
        $stateProvider
            .state('home.products', {
                url: 'products/',
                abstract: true,
                views: {
                    'main': {
                        templateUrl: 'templates/products.html'
                    }
                }
            })
            .state('home.products.list', {
                url: 'list/',
                templateUrl: 'templates/products.list.html',
                controller: 'ListProductController',
                controllerAs:'listProdCtrl'
            });
    }

    module.config($config);
})(angular.module('pizdely.mobile.products', []));