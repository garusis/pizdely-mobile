/**
 * Created by garusis on 16/10/16.
 */
;!(function (module) {

    $config.$inject = ['$stateProvider'];
    function $config($stateProvider) {
        $stateProvider
            .state('home.shop', {
                url: 'shops/',
                abstract: true,
                views: {
                    'main': {
                        templateUrl: 'templates/shops.html'
                    }
                }
            })
            .state('home.shop.list', {
                url: 'list/',
                templateUrl: 'templates/shops.list.html',
                controller: 'ListShopController',
                controllerAs:'listShopCtrl'
            })
        ;

    }

    module.config($config);
})(angular.module('pizdely.mobile.shops', []));