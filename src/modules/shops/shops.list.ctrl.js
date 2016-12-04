/**
 * Created by garusis on 16/10/16.
 */
;!(function (module) {

    ListShopController.$inject = ['$scope', '$state', 'Shop', 'Order','Loader','$timeout','$rootScope'];
    function ListShopController($scope, $state, Shop, Order,Loader,$timeout,$rootScope) {
        var listShopCtrl = this;

        listShopCtrl.shops = [];

        listShopCtrl.showLoader = function(){
            Loader.show();

            $timeout(function(){
                Loader.hidden();
            },3000);
        };

        listShopCtrl.selectShop = function(){
            
        };


        Shop.list()
            .then(function (shops) {
                listShopCtrl.shops = shops;
            });

    }

    module.controller('ListShopController', ListShopController);

})(angular.module('pizdely.mobile.shops'));