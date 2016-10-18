/**
 * Created by garusis on 16/10/16.
 */
;!(function (module) {

    $conf.$inject = ['$stateProvider'];
    function $conf($stateProvider) {
        $stateProvider
            .state('home.orders', {
                url: 'orders/',
                abstract: true,
                views: {
                    'main': {
                        templateUrl: 'templates/orders.html',
                        controller: 'OrderController',
                        controllerAs: 'orderCtrl'
                    }
                }
            })
            .state('home.orders.customize', {
                url: 'customize/?{orderId:int}',
                templateUrl: 'templates/orders.customize.html',
                controller: 'CustomizeOrderController',
                controllerAs: 'cusOrderCtrl',
                cache: false,
                data: {
                    title: 'Ingredientes'
                },
                resolve: {
                    order: ['Order', '$stateParams', function (Order, $stateParams) {
                        return Order.get({id: $stateParams.orderId});
                    }]
                }
            });
    }

    module.config($conf);
})(angular.module('pizdely.mobile.orders', []));