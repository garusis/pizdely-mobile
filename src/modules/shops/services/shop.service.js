/**
 * Created by garusis on 16/10/16.
 */
;!(function (module) {

    ShopFactory.$inject = ['MockStorage'];
    function ShopFactory(Mock) {

        function ShopService() {

        }

        Mock.seed('Shop', ShopService);
        return Mock.buildEssentialService(ShopService);
    }

    module.factory('Shop', ShopFactory);

})(angular.module('pizdely.mobile.shops'));