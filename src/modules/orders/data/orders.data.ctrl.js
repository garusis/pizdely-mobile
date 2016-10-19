/**
 * Created by garusis on 16/10/16.
 */
;!(function (module) {

    DataOrderController.$inject = ['$scope', '$state', 'order', 'ionicToast'];
    function DataOrderController($scope, $state, order, ionicToast) {
        if (!order)
            return $state.go('home.products.list');

        var dataOrderCtrl = this;
        dataOrderCtrl.order = order;
        dataOrderCtrl.product = order.products[0];
        dataOrderCtrl.view = {
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

        dataOrderCtrl.calculatePrice = function () {
            order.total = _.reduce(order.products, function (acum, product) {
                return acum + product.basePrice[product.size];
            }, 0);
        };

        dataOrderCtrl.getPizza = function () {
            ionicToast.show('Tu pedido sera procesado brevemente<br/>Muchas gracias por tu preferencia', 'top', false, 2500);
            $state.go('home.products.list');
        };

        dataOrderCtrl.calculatePrice();
    }

    module.controller('DataOrderController', DataOrderController);

})(angular.module('pizdely.mobile.orders'));