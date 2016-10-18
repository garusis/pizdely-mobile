/**
 * Created by garusis on 16/10/16.
 */
;!(function (module) {

    ListProductController.$inject = ['$scope', '$state', 'Product', 'Ingredient', 'Order'];
    function ListProductController($scope, $state, Product, Ingredient, Order) {
        var listProdCtrl = this;

        listProdCtrl.products = [];

        listProdCtrl.view = {
            sizeOptions: [
                {label: 'Pequeña', value: 'sm'},
                {label: 'Mediana', value: 'm'},
                {label: 'Grande', value: 'l'}
            ]
        };

        listProdCtrl.options = {
            size: listProdCtrl.view.sizeOptions[0].value
        };

        listProdCtrl.setSize = function (option) {
            listProdCtrl.options.size = option.value;
        };

        listProdCtrl.addToOrder = function (product, size) {
            product = _.cloneDeep(product);
            product.size = size;

            var ingredientsIds = _.map(product.additionals, 'id');
            return Ingredient.findByIds(ingredientsIds)
                .then(function (ingredients) {
                    ingredients = _.keyBy(ingredients, 'id');
                    product.additionals = _.map(product.additionals, function (ingredient) {
                        var additional = _.cloneDeep(ingredients[ingredient.id]);
                        additional.qty = ingredient.qty;
                        return additional;
                    });
                    return product;
                })
                .then(function (product) {
                    var order = {};
                    order.products = [product];

                    return Order.create(order)
                        .then(function (order) {
                            $state.go('home.orders.customize', {orderId: order.id});
                        });
                });
        };

        Product.list()
            .then(function (products) {
                listProdCtrl.products = products;
            });

    }

    module.controller('ListProductController', ListProductController);

})(angular.module('pizdely.mobile.products'));