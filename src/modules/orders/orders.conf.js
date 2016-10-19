/**
 * Created by garusis on 16/10/16.
 */
;!(function (module) {

    $conf.$inject = ['$stateProvider'];
    function $conf($stateProvider) {
        $stateProvider
            .state('home.orders', {
                url: 'orders/?{orderId:int}',
                abstract: true,
                views: {
                    'main': {
                        templateUrl: 'templates/orders.html',
                        controller: 'OrderController',
                        controllerAs: 'orderCtrl'
                    }
                },
                resolve: {
                    order: ['Order', '$stateParams', function (Order, $stateParams) {
                        return Order.get({id: $stateParams.orderId});
                    }]
                }
            })
            .state('home.orders.customize', {
                url: 'customize/',
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
            })
            .state('home.orders.size', {
                url: 'size/',
                templateUrl: 'templates/orders.size.html',
                controller: 'SizeOrderController',
                controllerAs: 'sizeOrderCtrl',
                cache: false,
                data: {
                    title: 'Tamaño'
                }
            })
            .state('home.orders.data', {
                url: 'data/?size',
                templateUrl: 'templates/orders.data.html',
                controller: 'DataOrderController',
                controllerAs: 'dataOrderCtrl',
                cache: false,
                data: {
                    title: 'Datos de entrega'
                }
            });
    }

    module.config($conf);
})(angular.module('pizdely.mobile.orders', []));