/**
 * Created by garusis on 16/10/16.
 */
;!(function (module) {

    CustomizeOrderController.$inject = ['$scope', '$state', 'order', 'Ingredient', 'ionicToast'];
    function CustomizeOrderController($scope, $state, order, Ingredient, ionicToast) {
        if (!order)
            return $state.go('home.products.list');

        var cusOrderCtrl = this;
        cusOrderCtrl.order = order;
        cusOrderCtrl.view = {
            firstItemAdded: true
        };

        cusOrderCtrl.dropZone = [];

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

        cusOrderCtrl.toggleAddToPizza = function (item) {
            cusOrderCtrl.view.curretSelected = cusOrderCtrl.view.curretSelected === item ? null : item;
            cusOrderCtrl.view.dropActive = !!cusOrderCtrl.view.curretSelected;
        };

        cusOrderCtrl.addToPizza = function (area) {
            var newAdditional = cusOrderCtrl.view.curretSelected;
            var additional = _.find(order.products[0].additionals, {id: newAdditional.id});
            if (!additional) {
                additional = _.cloneDeep(newAdditional);
                additional.qty = {left: 0, right: 0, all: 0, total: 0};
                order.products[0].additionals.push(additional);
            }
            additional.qty[area]++;
            additional.qty.total++;

            cusOrderCtrl.view.curretSelected = null;
            cusOrderCtrl.view.dropActive = false;

            if (cusOrderCtrl.view.firstItemAdded) {
                cusOrderCtrl.selectView('onMyPizza');
                cusOrderCtrl.view.firstItemAdded = false;
            }
            ionicToast.show('Se ha añadido '+additional.name + ' a tu pizza', 'top', false, 2500);
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