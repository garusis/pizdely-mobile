/**
 * Created by garusis on 16/10/16.
 */
;!(function (module) {

    SizeOrderController.$inject = ['$scope', '$state', 'order'];
    function SizeOrderController($scope, $state, order) {
        if (!order)
            return $state.go('home.products.list');

        var sizeOrderCtrl = this;
        sizeOrderCtrl.order = order;
        sizeOrderCtrl.product = order.products[0];
        sizeOrderCtrl.view = {
            sizeOptions: {
                sm: {
                    label: 'Pequeña',
                    qty: '1 - 2 Personas'
                },
                m: {
                    label: 'Mediana',
                    qty: '2 - 5 Personas'
                },
                l: {
                    label: 'Grande',
                    qty: '4 - 7 Personas'
                }
            }
        };

        sizeOrderCtrl.calculatePrice = function () {
            order.total = _.reduce(order.products, function (acum, product) {
                return acum + product.basePrice[product.size];
            }, 0);
        };

        sizeOrderCtrl.calculatePrice();
    }

    module.controller('SizeOrderController', SizeOrderController);

})(angular.module('pizdely.mobile.orders'));