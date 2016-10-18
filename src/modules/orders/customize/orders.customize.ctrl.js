/**
 * Created by garusis on 16/10/16.
 */
;!(function (module) {

    CustomizeOrderController.$inject = ['$scope', '$state', 'order', 'Ingredient'];
    function CustomizeOrderController($scope, $state, order, Ingredient) {
        if (!order)
            return $state.go('home.products.list');

        var cusOrderCtrl = this;
        cusOrderCtrl.order = order;
        cusOrderCtrl.view = {};

        cusOrderCtrl.selectView = function (itemsToShow) {
            cusOrderCtrl.view.currentItems = itemsToShow;
            if (itemsToShow === 'toAdd') {
                cusOrderCtrl.view.items = cusOrderCtrl.ingredients;
            } else {
                cusOrderCtrl.view.items = order.products[0].additionals
            }

        };

        cusOrderCtrl.calculatePrice = function () {
            order.total = _.reduce(order.products, function (acum, product) {
                return acum + product.basePrice[product.size];
            }, 0);
        };

        Ingredient.list()
            .then(function (ingredients) {
                cusOrderCtrl.ingredients = ingredients;
                cusOrderCtrl.selectView('toAdd');
            });

        cusOrderCtrl.calculatePrice();
        cusOrderCtrl.selectView('onMyPizza');
    }

    module.controller('CustomizeOrderController', CustomizeOrderController);

})(angular.module('pizdely.mobile.orders'));